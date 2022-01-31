import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width : 100vw;
  height: 100vh;
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
   color : white;
   background-color: teal;
   font-size : 20px;
   padding : 0.5em 1.2em;
   border : none;
   border-radius: 10px;
`
const Note = styled.p`
  margin-top : 10px;
  font-size: 20px;
`

const Success = () => {
  return <Container>
    <Button>Successfull</Button>
    <Note>Your order is successfully placed. Thanks for choosing us.</Note>
  </Container>;
};

export default Success;