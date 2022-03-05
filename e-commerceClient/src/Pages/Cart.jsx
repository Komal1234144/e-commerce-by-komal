import styled from 'styled-components';
import Nav from '../components/Nav';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { mobile } from '../Responsive';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../Redux/cartSlice';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width : 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
`

const Wrapper = styled.div`
  padding : clamp(0px , 1.5vw , 20px);
  margin-bottom: 30px;
  margin-top: 10vh;

  ${mobile({
    marginTop : '7vh'
  })}
`

const Title = styled.h1`
  font-size: clamp(20px , 2.5vw , 30px); 
  text-align: center;
  padding : 20px 0;
`

const TopContainer = styled.div`
  padding : clamp(5px , 1.5vw , 20px);
  display : flex;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.button`
  padding : 0.5em;
  font-size: clamp(10px , 1vw , 20px);
  font-weight: 700;
  background-color : ${(props)=>props.type ==='filled' ? 'black' : 'white'};
  color : ${(props)=>props.type ==='filled' ? 'white' : 'black'};
  border : 3px solid black;
  cursor : pointer;
`

const Links = styled.div`
  font-size: clamp(10px , 1.5vw , 17px);
  font-weight: 700;
  text-decoration: underline;
  ${mobile({
    display : 'flex',
    flexDirection : 'column'
  })}
  &>a{
      margin :  5px;
  }
`

const BottomContainer = styled.div`
  display : flex;
  ${mobile({
       flexDirection : 'column'
      })}
`

const Products = styled.div`
  flex : 3;
  display: flex;
  flex-direction: column;
`

const Product = styled.div`
   height: 300px;
   display : flex;
   margin: 20px 0; 
   border-bottom: 1px solid grey;
   ${mobile({
     height: "180px",
     position:  'relative'
   })}
`

const ImageContainer = styled.div`
  flex : 1;
  display : flex;
  justify-content: center;
  align-items: center;
  
`
const Img = styled.img`
    width : 100%;
    height: 280px;
    object-fit: contain;
  
      ${mobile({
        height : '160px', 
      })}
`
const InfoContainer = styled.div`
   padding : 0 20px;
   flex : 2;
   display: flex;
   ${mobile({
      flexDirection : 'column'  
      })}
`

const ProductDetails = styled.div`
   flex : 2;
   display: flex;
   flex-direction: column;
   justify-content :space-around;
   font-size : clamp(15px , 1.5vw , 28px);
   
   ${mobile({
      lineHeight : '30px'
      })}
`

const Pid = styled.p`
   font-size: clamp(12px , 1.5vw , 28px);;
`

const ProductColor = styled.div`
  width : clamp(15px , 1.5em , 30px);
  height:  clamp(15px , 1.5em , 30px);
  border-radius: 50%;
  border : none;
  background-color : ${(props)=>props.color};

`

const PriceDetails = styled.div`
  flex : 1;
  font-size : clamp(15px , 2vw , 30px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  ${mobile({
       alignItems : 'flex-start',
       lineHeight : '30px'
      })}
`

const Price = styled.p``

const Summary = styled.div`
 flex : 1;
 max-height: 350px;
 box-sizing: border-box;
 border : 1px solid #d3d3d3;
 border-radius: 15px;
 padding : 20px;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 ${mobile({
        flex : 0
      })}
 &>button{
      padding : 0.5em;
      color : white;
      background-color: black;
      font-size: 17px;
      border : none;
      width : 100%;
      margin-top : clamp(10px , 0.5em , 20px);
     
     &:disabled{
       background-color: grey;
     }
  }
`
const SummayTitle = styled.p`
  font-size: clamp(18px , 1vw , 24px);
`

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size:  ${(props)=>props.row==='total' ? 'clamp(17px , 1.5vw , 30px)' : 'clamp(15px , 1vw , 28px)'}; 
  font-weight: ${(props)=>props.row==='total' && 700};
  margin-top: clamp(5px , 0.5em , 15px);
`

const SummaryText = styled.p``

const SummaryAmount = styled.p` `

const RemoveFromCart = styled.button`
    border : none;
    background-color: teal;
    color : white;
    font-size: clamp(10px , 1vw , 15px);
    height : 3em;
    padding : 0.5em;

    ${mobile({
      position : 'absolute',
      right : '15px'
    })}
`
const Piece = styled.p``

const Cart = () => {

const navigate = useNavigate();
const cart = useSelector((state)=>state.persistedReducer.cart);
const user = useSelector((state)=>state.persistedReducer.user);

const checkOut = (e)=>{
  e.preventDefault();
  navigate('/checkout')
  // if(user.currentUser === null){
  //   navigate('/register')   
  // }else{
  //   navigate('/checkout')
  // }
}

const dispatch = useDispatch()
const handleRemove = (id , price , quantity) =>{
  dispatch(removeProduct({id , price , quantity}))
}

  return (
    <Container>
      <Nav/>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <TopContainer>
          <Button onClick={()=>navigate('/')}>Continue Shopping</Button>
        </TopContainer>
        <BottomContainer>
          <Products>
            {cart.products.map((product)=>  
              <Product key={`${product._id}0`}>
              <ImageContainer>
              <Link to={`/product/${product._id}`}>
               <Img src={product.img} alt=''/>
              </Link>  
             </ImageContainer>
              <InfoContainer>
                <ProductDetails>
                  <p><b>Product :</b> {product.title}</p>
                  <Pid><b>ID : </b>{product._id}</Pid>
                  <ProductColor color={product.color}/>
                  <p><b>Size : </b>{product.size}</p>
                </ProductDetails>
                <PriceDetails>
                  <Piece>{product.quantity >1 ? 
                   `${product.quantity} pcs.` :
                   `${product.quantity} pc.`
                  }</Piece>
                  <Price>Rs.{product.price * product.quantity}</Price>
                  <RemoveFromCart
                   onClick={()=>handleRemove(product._id , product.price , product.quantity)}>
                   Remove from Cart</RemoveFromCart> 
                </PriceDetails>
              </InfoContainer>
            </Product>
              )}
          
          
          </Products>
          <Summary>
            <SummayTitle>ORDER SUMMARY</SummayTitle>
            <SummaryItem>
              <SummaryText>Subtotal</SummaryText>
              <SummaryAmount>Rs. {cart.total}</SummaryAmount>
            </SummaryItem>
            <SummaryItem>
              <SummaryText>Estimated Shipping</SummaryText>
              <SummaryAmount>Rs.70</SummaryAmount>
            </SummaryItem>
            <SummaryItem>
              <SummaryText>Shipping Discount</SummaryText>
              <SummaryAmount>- Rs.70</SummaryAmount>
            </SummaryItem>
            <SummaryItem row={'total'}>
              <SummaryText>Total</SummaryText>
              <SummaryAmount>Rs.{cart.total}</SummaryAmount>
            </SummaryItem>
            <button 
            disabled={cart.total==0}
            onClick={checkOut}>CHECKOUT NOW</button>
          </Summary>
        </BottomContainer>
      </Wrapper>
      <Footer/>
    </Container>
  )
};

export default Cart;
