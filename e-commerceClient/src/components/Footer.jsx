import { EmailOutlined, Facebook, Instagram, Phone, Pinterest, Room, Twitter } from '@mui/icons-material';
import styled from 'styled-components';
import {mobile} from '../Responsive';

const Container = styled.div`

  width : 100vw;
  height: 30%;
  box-sizing: border-box;
  padding : clamp(5px , 1.5vw , 20px);
  display: flex;
  justify-content: space-between;
`
const Left = styled.div`
   flex : 1;
   padding : clamp(2px , 1.5vw , 10px);
   ${mobile({
     display : 'none'
   })}
`;

const Logo = styled.h1`
  font-size : clamp(20px , 2vw , 30px);
`;
const Desc = styled.p`
  margin-top : clamp(10px  , 2vw  , 30px );
  margin-bottom  : clamp(10px  , 2vw  , 30px );
  font-size: clamp(10px , 1vw , 20px);
  font-weight: bold;
  letter-spacing: 0.5px;
  line-height: clamp(15px , 1.5vw , 30px);
  
`;
const SocialContainer = styled.div`
  display: flex;
`
const SocialIcon = styled.div`
  margin-right: 10px;
  width : clamp(25px , 2.5vw , 40px);
  height: clamp(25px , 2.5vw , 40px);
  border-radius: 50%;
  background-color: ${(props)=>props.bg};
  color : white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Center = styled.div`
  flex : 1;
  margin-right : clamp(0px , 1vw , 10px);
  margin-left : clamp(0px , 1vw , 10px);
  padding: clamp(2px , 1vw , 10px);
  height: 100%;

  &>h2{
      margin-left : clamp(5px , 1vw , 20px );
      font-size: clamp(15px , 2vw , 30px);
  }
`;

const Lists = styled.div`
  display: flex;
`
const List = styled.ul` 
  flex : 1; 
  margin : 10px 0;
  font-size: clamp(10px , 1.5vw , 20px);
  list-style-type: none;
`
const ListItem = styled.li`
  margin: clamp(5px , 1.5vw , 20px);
  
`
const Right = styled.div`
  flex : 1;
  padding : 10px;
  font-size: clamp(10px , 1.5vw , 20px);
 
  &>h1{
    font-size: clamp(15px , 2vw , 30px);
    margin-bottom: clamp(10px , 1.5vw , 30px);
  }
`;

const Address = styled.p`
  margin-bottom : 20px;
  
  display: flex;
`
const Contact = styled.p`
margin-bottom : 20px;

display: flex;
`
const Email = styled.p`
margin-bottom : 20px;
display: flex;
`
const Payment = styled.img`
   max-width : 200px;
   height: 50px;
   margin-right : 10px;
`
const Footer = () => {
    return (
       <Container>
         <Left>
          <Logo>E-COM.</Logo>
          <Desc>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,</Desc>
          <SocialContainer>
            <SocialIcon bg={`#${'0085cc'}`}>
              <Facebook/>
            </SocialIcon>  
            <SocialIcon bg = {`#${'cf77cc'}`}>
              <Instagram/>
            </SocialIcon>
            <SocialIcon bg = {`#${'0496ff'}`}>
               <Twitter/>
            </SocialIcon>
            <SocialIcon bg = {`#${'d81159'}`}>
               <Pinterest/>
            </SocialIcon>
          </SocialContainer>
         </Left>
         <Center>
           <h2>Useful Links</h2>
          <Lists> 
           <List>
             <ListItem>Home</ListItem>
             <ListItem>Men's Fashion</ListItem>
             <ListItem>Accessories</ListItem>
             <ListItem>Order Tracking</ListItem>
             <ListItem>Wishlist</ListItem>
           </List>
           <List> 
             <ListItem>Cart</ListItem>
             <ListItem>Women's Fashion</ListItem>
             <ListItem>My Account</ListItem>
             <ListItem>Wishlist</ListItem>
             <ListItem>Terms</ListItem>
           </List>
         </Lists> 
         </Center>
         <Right>
            <h1>Contact</h1>
            <Address><Room style={{marginRight : 10}}/>011 Random Path , Random city - pincode</Address>
            <Contact><Phone style={{marginRight : 10}}/>+1234 56 78</Contact>
            <Email><EmailOutlined style={{marginRight : 10}}/>contact@demo.com</Email>
            <Payment src="https://i.ibb.co/LYnCh83/cards.jpg" />
         </Right>
      </Container>
    )
}

export default Footer
