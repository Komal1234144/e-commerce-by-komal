import styled from "styled-components";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { sliderItems } from "../data";
import { useState } from "react";
import { mobile } from "../Responsive";
import {Link} from 'react-scroll';

const Container = styled.div`
    width : 100%;
    display : flex;
    overflow: hidden;
    box-sizing: border-box;

    ${mobile({
      height : '50vh',
      width : '100%'
    })}
`

const Arrow = styled.div`
      height : 50px;
      width : 50px;
      border-radius : 50%;
      background-color: #e7eaee;
      opacity : 0.5;
      cursor: pointer;
      position: absolute;
      top : 55%;
      right : ${(props)=> props.direction==='right' && '10px'};
      margin-left: ${(props)=>props.direction=='left' && '10px'};
      z-index : 2;

      ${mobile({
        top : '30%',
        width : '30px',
        height : '30px',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
      })}
`

const Wrapper = styled.div`
    height: 90vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    transform:translateX(${(props)=> props.page * -100}vw);
    transition: all 1s ease;
  
`
const Slide = styled.div`
    width : 100vw;
    height: 100%;
    display: flex;
    background-color: ${(props)=>`#${props.bg}`};
  
`
const ImageContainer = styled.div`
      flex : 1;
      height : 100%;
      width : 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    
      ${mobile({
       width : '200px',
       height : '400px'
      })}
    &>img{
        display: block;
        height: 80%;
        width : 100%;
        padding-left : 100px; 
        object-fit: contain;
        ${mobile({
          width : '100%',
          height : '90%',
          paddingLeft : '0px',
        
        })}
    }
`
const InfoConatiner=styled.div`
        flex : 1;
        display: flex;
        flex-direction: column;
       
        align-items: center;
        font-size: x-large;
        margin : auto 100px auto 0;
       
        ${mobile({
          width : '200px',
          height : '400px',
          margin : 0,
          padding : '15px 15px 0 0',
          fontSize : '12px',
          justifyContent : 'center'
        })}
    &>p{
        margin : 50px 0;  
        text-align: center;

        ${mobile({
          margin: '20px 30px 20px 0'
        })}
    }

    &>button{
      padding : 10px;
      border : 2px solid black;
      background-color: transparent;
      font-size: large;
      font-weight: 700;
      cursor : pointer;

      ${mobile({
        fontSize : 'medium',
        padding : '5px'
      })}
    }
`

const Slider = () => {

const [translate , setTranslate] = useState('');
const [page , setPage] = useState(0);

const dir=(direction)=>{
   if(direction === 'left'){
     console.log('left')
     setTranslate('left')
      page !== 0 ? setPage(page - 1) : setPage(2)
   }else{
     setTranslate('right')
     page !== 2 ? setPage(page + 1) : setPage(0);
   }
}

const scrollToBelow=()=>{
  window.scroll({top: 1000, behavior: "smooth"})
}

    return (
       <Container>
         <Arrow direction='left' onClick={()=> dir('left')}>
           <ArrowLeftIcon style={{fontSize : 50}} />
         </Arrow>
         <Wrapper dir={translate} page={page}>
          {sliderItems.map((item)=>{
           return (<Slide key={item.id} bg={item.bg} >
            <ImageContainer>
              <img src={item.img} />
            </ImageContainer> 
              <InfoConatiner>
                 <h1>{item.title}</h1>
                 <p>{item.desc}</p>
                 <button>
                 <Link
                 to="categories"
                 smooth={true}
                 duration={500}
             >
                 SHOP NOW
             </Link>
                 </button>
              </InfoConatiner>
            </Slide>)
          })}
        </Wrapper> 
        <Arrow direction ='right' onClick={()=> dir('right')}>
          <ArrowRightIcon style={{fontSize : 50}} />
        </Arrow>         
       </Container>
    )
}

export default Slider
