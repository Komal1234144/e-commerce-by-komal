import { Send } from '@mui/icons-material';
import styled from 'styled-components';

const Container = styled.div`
  max-width : 100vw;
  padding : clamp(20px , 3vw , 50px);
  box-sizing: border-box;
  background-color : #e7dae4;
  display: flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;

 &>h1{
     font-size: clamp(25px , 3vw , 50px);  
 }

 &>p{
     font-size: clamp(15px , 2vw , 25px);
     margin : clamp(15px , 2.5vw , 40px);
     text-align :center;
 }
`
const InputContainer = styled.div`
   width : clamp(200px , 40% , 1000px);
   height : clamp(20px , 4vw , 50px);
   display: flex;
   justify-content: space-between;
  
   &>input{
      flex : 7;
      border : none;
      margin-right: 10px;
      padding : clamp(15px , 1vw , 20px);
      font-size: clamp(15px , 1.5vw , 20px);
   }

   &>button{
       flex: 1;
       padding : clamp(15px , 1vw , 20px);
       display: flex;
       justify-content: center;
       align-items: center;
       border : none;
       background-color: teal;
       cursor : pointer;
   }
`

const Newsletter = () => {
    return (
        <Container>
          <h1>Newsletter</h1>
          <p>Get timely updates from your favorite products</p>
          <InputContainer>
             <input placeholder='your email address'/>
             <button>
               <Send style={{color : 'white' , fontSize:'2.5vw'}}/>
             </button>
          </InputContainer>
        </Container>
    )
}

export default Newsletter
