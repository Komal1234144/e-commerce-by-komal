import styled from "styled-components";
import {mobile} from '../Responsive';

const Container = styled.div`
      max-width : 100vw;
      height : 50px;
      background-color : teal;
      color : white;
      display : flex;
      justify-content : center ;
      align-items : center;  
    
    ${mobile({
      height : '30px'
    })}  

  &>p{
      font-size : 15px ;
      text-align : center;
  }
`

const Announcement = () =>{
  return(
      <Container>
         <p>Super Deal! Free shipping on orders over Rs.3999</p>
      </Container>
  )
}

export default Announcement;