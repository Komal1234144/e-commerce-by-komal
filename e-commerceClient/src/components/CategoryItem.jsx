import styled from 'styled-components';
import { mobile } from '../Responsive';


const Conatiner = styled.div`
  flex : 1;
  margin : 3px;
  box-sizing: border-box;
  position: relative;

  ${mobile({
    height : '33%'
 })}
`

const Image = styled.img`
  height : 100%;
  width :  100%;
  object-fit: cover;
  filter: brightness(60%);

`

const Info = styled.div`
  position: absolute;
  top : 0;
  left : 0;
  width : 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color : white;
  margin : auto;
 
  &>h1{
      font-size: 30px;
      font-weight : normal;
      letter-spacing: 2px;
      margin-bottom : 20px;

    ${mobile({
      fontSize : '20px',
      letterSpacing : 0
    })}
  }

  &>button{
      padding : 10px;
      font-size : large;
      font-weight: bold;
      border: none;
      background-color: white;
      color : grey;
      cursor: pointer;
      transition: all 0.5s ease;

      &>a{
        color : black;
        text-decoration: none;
      }

      &:hover{
        transform: scale(1.1);
      }

      ${mobile({
        padding : '3px',
        fontSize : 'medium'
      })}
  }
  
`

const CategoryItem=({item})=>{
   return(
      <Conatiner>
         <Image src={item.img} alt=''/>
         <Info>
           <h1>{item.title}</h1>
           <button>
           <a href= {`/products/${item.cat}`}>
           SHOP NOW
           </a>
           </button>
         </Info>
      </Conatiner>
   )
}

export default CategoryItem;