import styled from "styled-components";

export const Container = styled.div`
  width : 100%;
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding : 10px;
`

export const GoBack = styled.button`
  font-size: clamp(15px , 1.5vw , 25px);
  padding : 0.5em;
  border : none;
  align-self: flex-end;
  background-color: teal;
  margin-bottom: 15px;

 &>:first-child{ 
     text-decoration: none;
     color : white;
 }
 
`

export const Wrapper = styled.div`
  width : 50%;
  min-height: 90%;
  display : flex;
  flex-direction: column;
  padding : 10px;
  border : 1px solid grey;
  border-radius : 10px;

 @media only screen and (max-width: 500px) {
        width: 90%;
    }
`
export const Heading = styled.h1`
 font-size: 25px;
 text-align: center;
 margin-bottom: 10px;
`
export const FormError = styled.p`
  text-align : center;
  font-size: 12px;
  color : red;
`
export const Form = styled.form``

export const Label = styled.label`
  font-size: 20px; 
`
export const CardWrapper = styled.div`
  width : 90%;
  height: 40px;
  padding : 10px 5px;
  margin : 10px 0;
  border : 2px solid black;
  border-radius: 10px;
`

export const ButtonWrapper = styled.div`
   width : 100%;
   display: flex;
   justify-content: center;
`

export const PayButton = styled.button`
   border : 3px solid black;
   font-size: 20px;
   padding : 0.5em;
   margin-left : 30%;
   margin-right : 30%;
   transform: transition(all 1s ease);
   &:hover{
     transform : scale(1.1)
   }

   &:disabled{
     background-color: blue;
   }
`