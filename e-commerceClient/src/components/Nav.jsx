import styled from "styled-components"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from "../Responsive";
import Badge from '@mui/material/Badge';
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";

const Container = styled.div`
    width : 100vw;
    height : 10vh;
    display : flex;
    justify-content : space-between;
    align-items : center;
    position: fixed;
    top : 0;
    z-index : 999;
    background-color: white;
    box-shadow: 0px 2px 6px 1px rgba(110,99,99,0.75);
-webkit-box-shadow: 0px 2px 6px 1px rgba(110,99,99,0.75);
-moz-box-shadow: 0px 2px 6px 1px rgba(110,99,99,0.75);


    ${mobile({
      height : '8vh',
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
     font-size: 22px;
     cursor : pointer;

     &>a{
       color : black;
       text-decoration: none;
     }
     ${mobile({
       marginRight : '20px',
       fontSize : '15px'})}
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
  font-size : clamp(25px , 3.3vw , 38px);
  font-weight : bold;
  
  a{color : black;
  text-decoration: none;
  }

  ${mobile({
    fontSize : '20px',
    textAlign : 'left'
  })}
`;


const Nav = () => {
  const quantity = useSelector((state)=> state.persistedReducer.cart.quantity)
    return (
     <Container>
      <Logo><a href='/'>E-COM.</a></Logo>
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
