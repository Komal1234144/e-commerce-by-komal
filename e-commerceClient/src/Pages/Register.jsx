import styled from 'styled-components';
import {mobile} from '../Responsive';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import {register} from '../Redux/apiCalls';

const Container = styled.div`
  width : 100vw;
  height: 100vh;
  box-sizing : border-box;
  position: relative;  
`
const Image = styled.img`
  width : 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(70%);
  
`
const Wrapper = styled.div`
   width : 30%;
   max-height: 90vh;
   padding : 20px;
   display : flex;
   flex-direction: column;
   position: absolute;
   top : 5%;
   right: 80px;
   background-color: white;
   box-shadow: 0 4px 8px  rgba(0, 0, 0, 0.5), 0 6px 20px  rgba(0, 0, 0, 0.19);

  ${mobile({
    width : '60%',
    maxHeight : '80%',
    top : '15%',
    left : '50px'
  })}
  &>h1{
    font-size: clamp(20px , 1.5vw , 30px);
  }
`
const Form = styled.div`
  display: flex;
  flex-direction: column;
  
  &>input{
    margin : 10px 0;
    padding : 10px;
    font-size : 15px;
   ${mobile({
     padding : '5px',
     margin : '5px 0'
   })}
  }
`
const Logo = styled.div`
  padding: 5px 10px;
  background-color: white;
  position : absolute;
  top : 20px;
  left : 20px;
  font-size: 30px;
  background-color : rgba(255,255,255,0.5);
`

const Agreement = styled.p`
  margin : 20px 0;
  font-size : clamp(15px , 1.2vw , 25px);
  line-height: 20px;
`
const Button = styled.button`
  width : 40%;
  padding : 10px;
  background-color: teal;
  color: white;
  font-size: clamp(10px , 1vw , 20px);
  border: none;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover{
    box-shadow: 0 4px 8px  rgba(0, 0, 0, 0.5), 0 6px 20px  rgba(0, 0, 0, 0.19);
  }
`

const Link = styled.a`
  margin : 5px 0;
  text-decoration: underline;
  font-weight : 700;
  font-size : 15px;
  cursor: pointer;
`

const Error = styled.p`
  font-size: 15px;
  color : red;
`

const Login = () => {
const dispatch = useDispatch();
const navigate = useNavigate();


const [user , setUser] = useState({username : '' , email : '' , password : ''});
const [errorMsg , setErrorMsg] = useState('');

const handleClick = async() =>{
 const result =  await register(dispatch , user);

  result===true ? navigate('/login')
  : setErrorMsg('Wrong credentials')
  
}

  return (
      <Container>
        <Image src="https://i.ibb.co/w4cktLs/Register-Final.jpg" alt='' />
        <Logo>E-COM.</Logo>
        <Wrapper>
          <h1>CREATE AN ACCOUNT</h1>
          {errorMsg && <Error>{errorMsg}</Error>}
          <Form>
            <input placeholder='first name' />
            <input placeholder='last name' />
            <input placeholder='username' onChange={(e)=>setUser({...user , username: e.target.value})}/>
            <input placeholder='email' onChange={(e)=>setUser({...user , email:e.target.value})}/>
            <input placeholder='password' type="password"/>
            <input placeholder='confirm password'
             type ="password"
             onChange={(e)=>setUser({...user , password: e.target.value})}/>
          </Form>
          <Agreement>By creating an account , I consent to the processing of my personal data
          in accordance with the <b>PRIVACY POLICY</b></Agreement>
          <Link onClick={()=>navigate('/login')}>Already have an account ? Login</Link>
          <Button onClick={handleClick}>CREATE</Button>
        </Wrapper>
      </Container>
  )
};

export default Login;

