import styled from "styled-components"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from "../Responsive";
import Badge from '@mui/material/Badge';
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";

const Container = styled.div`
    max-width : 100vw;
    display : flex;
    justify-content : space-between;
    padding : 10px 20px;
    align-items : center;
    ${mobile({
      padding : '12px 10px',
      justifyContent : 'center'
    })}
`

const Right = styled.div`
   flex : 2;
   display : flex;
   justify-content: flex-end;
   align-items: center;
   ${mobile({
     flex : 1.5,
     })}

   &>p{
     margin-right :  30px;
     font-size: 20px;
     cursor : pointer;

     &>a{
       color : black;
       text-decoration: none;
     }
     ${mobile({
       marginRight : '7px',
       fontSize : '12px'})}
 }

`
const IconRight = styled.div`
  margin-right: 30px;
  cursor : pointer;
 
  ${mobile({
    marginRight : '10px',
  })}
`

const Logo = styled.p`
  flex : 1;
  text-align : center;
  font-size : 30px;
  font-weight : bold;
 
  ${mobile({
    fontSize : '17px',
    textAlign : 'left'
  })}
`;


const Nav = () => {
  const quantity = useSelector((state)=> state.persistedReducer.cart.quantity)
    return (
     <Container>
      <Logo>E-COM.</Logo>
      <Right>
        <p><a href='/register'>Register</a></p>
        <p><a href='/login'>Sign In</a></p> 
        <IconRight>
        <Link to="/cart">
        <Badge badgeContent={quantity} color="primary">
          <ShoppingCartOutlinedIcon sx={{fontSize : '25px'}} />   
        </Badge> 
        </Link>   
        </IconRight>  
      </Right>
     </Container>
    )
}

export default Nav;
