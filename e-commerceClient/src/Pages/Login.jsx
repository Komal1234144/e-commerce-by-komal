import styled from 'styled-components';
import {mobile} from '../Responsive';
import {login} from '../Redux/apiCalls';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
  filter : brightness(70%);

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

const Wrapper = styled.div`
   width : 30%;
   margin-left : auto;
   padding : 20px;
   display : flex;
   flex-direction: column;
   position: absolute;
   top : 30%;
   left: 30%;
   background-color: white;
   box-shadow: 0 4px 8px  rgba(0, 0, 0, 0.5), 0 6px 20px  rgba(0, 0, 0, 0.19);
   
${mobile({
  width : '70%',
  left : '10%'
})}

  &>h1{
    font-size: 30px;
  }
`
const Form = styled.div`
  display: flex;
  flex-direction: column;
  
  &>input{
    margin : 10px 0;
    padding : 10px;
    font-size : 15px; 
  }
`
const Button = styled.button`
  width : 40%;
  margin : 10px 0;
  padding : 10px;
  background-color: teal;
  color: white;
  font-size: large;
  border: none;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover{
    box-shadow: 0 4px 8px  rgba(0, 0, 0, 0.5), 0 6px 20px  rgba(0, 0, 0, 0.19);
  }

  &:disabled{
    cursor : not-allowed;
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
  color : red;
  font-size: 15px;
`

const Login = () => {
const [username , setUsername] = useState('')
const [password , setPassword] = useState('')
const dispatch = useDispatch();
const navigate = useNavigate();
const {isFetching , error} = useSelector((state)=>state.persistedReducer.user)
const [errorMsg , setErrorMsg] = useState('');

  const handleSubmit=async(e)=>{

    await login(dispatch , {username , password})
    console.log(error)
    if(error){
      setErrorMsg('Something went wrong.')
      setTimeout(()=>{
        setErrorMsg('')
      },1500)
    }
  }
 
  return (
      <Container>
      <Image src='https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'  alt=''/>
      <Logo>E-COM.</Logo>
      <Wrapper>
        <h1>SIGN IN</h1>
        <Form>
          <input placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
          <input placeholder='password' type="password"
          onChange={(e)=>setPassword(e.target.value)}/>
        </Form>
        <Button
        disabled={isFetching} 
        onClick={handleSubmit}>LOGIN</Button>
        {errorMsg && <Error>{errorMsg}</Error>} 
        <Link onClick={()=>navigate('/register')}>Create an account</Link>
      </Wrapper>
      </Container>
  )
};

export default Login;
