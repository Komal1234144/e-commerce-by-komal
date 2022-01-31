import styled from 'styled-components'
import Nav from '../components/Nav';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { Add, Remove } from '@mui/icons-material';
import { mobile } from '../Responsive';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addProduct } from '../Redux/cartSlice';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  max-width : 100vw;
  box-sizing: border-box;
`
const Wrapper = styled.div`
  display : flex;
  ${mobile({
    flexDirection : 'column'
  })}
`
const ImageContainer= styled.div`
  flex : 1;
  padding : clamp(20px , 2vw , 50px);
  display : flex;
  justify-content: center;
 
  &>img{
    display : block;
    width :clamp(200px , 18vw , 800px);
   
  }
`
const InfoContainer = styled.div`
  flex : 1;
  padding : clamp(20px , 2vw , 50px);
 
  &>p{
    margin : 30px 0;
   font-size: large;
    font-weight: 500;
  }

  &>span{
      font-size: 30px;
  }
`
const FilterContainer = styled.div`
  margin : 50px 0;
  width : 70%;
  display: flex;
  justify-content: space-between;
 
`
const ColorFilter = styled.div`
  flex : 1;
  display: flex;
  margin-right: 20px;
`
const FilterText = styled.p`
  font-size: 20px;
  margin-right: 10px;
`
const Color = styled.div`
  width : 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${(props)=>props.bg};
  display : flex;
  align-items: center;
  cursor : pointer;
`
const SizeFilter = styled.div`
  flex : 1;
  display: flex;
`
const FilterSelect = styled.select`
  padding : 0 10px;
  font-weight: 700;

`
const FilterOption = styled.option``

const CartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width : 70%;
  margin-top : 50px;
  ${mobile({
    maxWidth : '100%'
  })}
  
  &>div{
    flex : 1;
    display: flex;
    align-items: center;
  
   
    &>div{
      margin : 0 5px;
      width : 40px;
      height: 30px;
      border-radius: 15%;
      border : 2px solid teal;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: large;
      
    }
  }
  &>button{
     margin-right: 60px;
     padding : 0.5em ;
     background-color: transparent;
     border : 3px solid teal;
     letter-spacing: -0.5px;
     font-weight: 700;
     cursor : pointer;
     ${mobile({
       marginRight : '20px'
     })}
     &:hover{
        background-color: #f5f3f4;
     }
  }
`


const Product = () => {
 const location = useLocation();
 const dispatch = useDispatch();
 const id = location.pathname.split('/')[2];
 const [product , setProduct] = useState({});
 const [quantity , setQuantity] = useState(1);
 const [color , setColor] = useState('');
 const [size , setSize] = useState('');
 const [error , setError] = useState("");

  useEffect(()=>{
   
    const getProduct =async()=>{
    try{
      const res = await fetch(`http://localhost:3001/api/products/${id}`, {
        method : 'GET',
      })
      const data = await res.json();
      setProduct(data);
      
    
    }catch(err){
        setError(err);
      }
    }

    getProduct();
  }, [id]);

  const handleButton=(type)=>{
     if(type==='increase'){
       setQuantity(quantity + 1)
     }else{
       quantity > 1 && setQuantity(quantity - 1);
     }
  }


const handleCart=()=>{
  dispatch(addProduct({...product , quantity , color , size}))
}


    return (
      <Container>
        <Nav/>
        <Announcement/>
        <Wrapper>
          {error && <p>{error}</p>}
          <ImageContainer>
            <img src={product.img} alt=''/>
          </ImageContainer>
          <InfoContainer>
            <h1>{product.title}</h1>
            <p>{product.desc}</p>
            <span>Rs.{product.price}</span>
            <FilterContainer>
              <ColorFilter>
                <FilterText>Color :</FilterText>
                 {
                 product.color && product.color.map((c)=>{
                   return (<Color onClick={()=>setColor(c)} bg={c} key={c}></Color>)
                 })}
               
              </ColorFilter>
              <SizeFilter>
                <FilterText>Size :</FilterText>
                <FilterSelect  onClick={(e)=>{
                  setSize(e.target.value)}}>
                    {product.size && product.size.map((s)=>{
                      return (<FilterOption 
                        
                        key={s}>{s}</FilterOption>)
                    })}
                  
                </FilterSelect>
              </SizeFilter>
            </FilterContainer>
            <CartContainer>
              <div>
                <Add onClick={()=>handleButton('increase')}/>
                <div>{quantity}</div>
                <Remove onClick={()=>handleButton('decrease')}/>
              </div>
              <button onClick={handleCart}>ADD TO CART</button>
            </CartContainer>
          </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/> 
      </Container>
    )
}

export default Product
