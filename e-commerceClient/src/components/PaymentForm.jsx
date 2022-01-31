import axios from "axios"
import React, { useState } from 'react'
import Success from './Success';
import {Link, useNavigate} from 'react-router-dom';
import * as Styled from'./PaymentForm.styled';
import styled from "styled-components";
import { mobile } from "../Responsive";
import uniqid from 'uniqid';
import { CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js"

import { useSelector } from "react-redux";

//Modal imports
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


//Modal styling
const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  // Order Bag styling
const Wrapper = styled.div``

  const Products = styled.div`
  flex : 3;
  display: flex;
  flex-direction: column;
`
const Product = styled.div`
   max-height: 200px;
   display : flex;
   margin: 10px 0; 
`
const ImageContainer = styled.div`
  flex : 1;

  &>img{
      width : 100%;
      height: 100%;
      object-fit: contain;

      ${mobile({
        height : '150px',
       // width : '150px',
        alignSelf : 'center'
      })}
  }
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


const Price = styled.p` `

const Title = styled.p`
  font-size: 25px  ;
  text-align:  center;
  margin: 20px 0;
`
const Piece = styled.p``

export default function PaymentForm() {

    const [success, setSuccess ] = useState(false);
    const [formError , setFormError] = useState('');
    const cart = useSelector((state)=>state.persistedReducer.cart); 
    const stripe = useStripe()
    const elements = useElements()
    const total = useSelector((state)=>state.persistedReducer.cart.total);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:3001/api/checkout/payment", {
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true) 
                setOpen(false)
                setTimeout(()=>{
                   navigate('/')
                },2000)
            }

        } catch (error) {
            console.log("Error", error)
            setFormError(error.message)
        }
    } else {
        console.log(error.message)
        setFormError(error.message)
    }
}

 //Modal state and functions
 const classes = useStyles();
 const [open, setOpen] = useState(false);
 
 const handleClick=()=>{
   console.log(formError)
   formError ? 
         setOpen(false)
   : setOpen(true)
 }

    return (
        <>
         {success? <Success/> :
<Styled.Container>
  <Styled.GoBack>
    <Link to="/cart">Go Back</Link>
  </Styled.GoBack>
  <Styled.Wrapper>
  <Styled.Heading>Enter your Card Info:</Styled.Heading>
  <h2 style={{textAlign : "center" , color:"blue"}}>(Total amount to be paid is Rs.{total}) </h2>
   {formError && <Styled.FormError>{formError}</Styled.FormError>}
  <Styled.Form onSubmit={handleSubmit}>
    <Styled.Label>Card no:</Styled.Label>
    <Styled.CardWrapper><CardNumberElement/></Styled.CardWrapper>
    <Styled.Label>Expiry Date:</Styled.Label>
    <Styled.CardWrapper><CardExpiryElement/></Styled.CardWrapper>
    <Styled.Label>CVC :</Styled.Label>
    <Styled.CardWrapper><CardCvcElement/></Styled.CardWrapper>
    <Styled.ButtonWrapper>
    <Styled.PayButton   onClick={handleClick}>Pay Now</Styled.PayButton>
    </Styled.ButtonWrapper>
    </Styled.Form>
  </Styled.Wrapper> 
</Styled.Container>
        }
    
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        close={!open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 style={{fontSize:'25px'}} id="transition-modal-title">Processing...</h2>
            <p style={{fontSize:'15px'}}id="transition-modal-description">Please wait for a moment.</p>
          </div>
        </Fade>
      </Modal>
     
  
      <Products>
      <Title> YOUR ORDER </Title>
      {cart.products.map((product)=>
        <Wrapper>
        <Product key={uniqid()}>
        <ImageContainer>
          <img src={product.img} alt=''/>
        </ImageContainer>
        <InfoContainer>
          <ProductDetails>
            <p><b>Product :</b> {product.title}</p>
            <p><b>ID :</b>{product._id}</p>
            <ProductColor color={product.color}/>
            <p><b>Size : </b>{product.size}</p>
          </ProductDetails>
          <PriceDetails>
          <Piece>{product.quantity >1 ? 
            `${product.quantity} pcs.` :
            `${product.quantity} pc.`
           }</Piece>
            <Price>Rs.{product.price * product.quantity}</Price> 
          </PriceDetails>
        </InfoContainer>
        
      </Product>
      <hr/>
      </Wrapper>
        )}
       
    </Products>

        </>
    )
}