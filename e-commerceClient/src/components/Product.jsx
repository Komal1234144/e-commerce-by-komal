import styled from "styled-components"
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useDispatch } from "react-redux";
import { addProduct } from "../Redux/cartSlice";
import { useState } from "react";
import { mobile } from "../Responsive";

const Info = styled.div`
   opacity: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   height: 100%;
   width : 100%;
   background-color : rgba(0,0,0,0.6);
   z-index: 3;
   transition: all 0.7s ease-in;
`

const Icon = styled.div`
  width : 40px;
  height : 40px;
  border-radius: 50%;
  margin : 5px;
  background-color: white;
  display: none;
  justify-content: center;
  align-items: center;
  cursor : pointer;
  transition:  all 2s ease;

  &:hover{
      transform : scale(1.2)
  }
`

const Container = styled.div`
  background-color: #f1f9f8;
  margin : 5px;
  flex: 1;
  min-width : 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
 &:hover ${Info}{
    opacity: 1;
 }

 &:hover ${Icon}{
   display : flex;
 }
`

const Image = styled.img`
   width: 100%;
   height: 100%;
   z-index: 2;
   object-fit: contain;
   
`

const Product = ({img , id , product}) => {
 const dispatch = useDispatch()

 const DirectAddToCart=(product)=>{
  dispatch(addProduct({...product , quantity : 1}))
 }

    return (
       <Container>
         <Image src={img} />
         <Info>
           <Icon onClick={()=>DirectAddToCart(product)}>
             <Link style={{color : 'black'}} to='/cart'>
             <ShoppingCartOutlinedIcon sx={{fontSize : '20px'}}/>
             </Link>
           </Icon>
           <Icon>
            <Link style={{color : 'black'}} to={`/product/${id}`}>
              <SearchOutlinedIcon sx={{fontSize : '20px'}}/>
            </Link>  
           </Icon>
         </Info>
       </Container>
    )
}

export default Product
