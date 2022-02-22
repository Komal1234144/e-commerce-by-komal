import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Product from './Product';

const Container = styled.div`
   width : 100%;
   padding : 20px;
   box-sizing: border-box;
   display: flex;
   flex-wrap: wrap; 
`

const Products = ({category , filters , sort}) => {

  const [products , setProducts] = useState([]); 
  const [filteredProducts , setFilteredProducts] = useState([]); 

 useEffect(()=>{

  const getProducts = async()=>{
    try{
   const res = await fetch( category ? 
    `https://e-commerce-by-komal.herokuapp.com/api/products?category=${category}` :
     `https://e-commerce-by-komal.herokuapp.com/api/products`, {
     method : 'GET',
   });
   const data = await res.json();
      setProducts(data);
    }catch(err){
      console.log(err);
    }
  }

    getProducts();
   
}, [category])

useEffect(()=>{
  if(filters && filters.color ==='All' ||filters && filters.size==='All'){
    setFilteredProducts(products)
  }else if(!filters){
    setFilteredProducts(products)
  }else{
    setFilteredProducts(
      products.filter((item)=>{
        return(
          Object.entries(filters).every(([key, value])=>
          item[key].includes(value))
        )
      })
    )
  }
  
  
} ,[ filters , products , category])

useEffect(()=>{
  if(sort==="newest"){
    setFilteredProducts((prev)=>
     [...prev].sort((a,b)=>
     b.created = a.created)
    )
  } else if(sort==="Price(asc)"){
    setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>
     a.price - b.price))
  }else{
    setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>
    b.price - a.price))
  }
  
}, [sort])

    return (
       <Container>
       
       {category ?  filteredProducts.map((product)=>{
  
        return(<Product key={product._id} img={product.img} id={product._id} product={product}/>)
    }):
    products.slice(0,8).map((product)=>{
      
     return(<Product key={product._id} img={product.img} id={product._id} product={product}/>)
 }) 
   }
       </Container>
    )
}

export default Products
