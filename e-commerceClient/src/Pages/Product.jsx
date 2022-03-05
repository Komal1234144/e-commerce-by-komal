import styled from 'styled-components'
import Nav from '../components/Nav';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { Add, Remove } from '@mui/icons-material';
import { mobile } from '../Responsive';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addProduct } from '../Redux/cartSlice';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  max-width : 100vw;
  box-sizing: border-box;
`
const Wrapper = styled.div`
  display : flex;
  margin-top: '10vh';
  height : 65vh;
  
  ${mobile({
    height : '70vh',
    flexDirection : 'column',
    marginTop : '2.5vh'
  })}
`
const ImageContainer= styled.div`
  flex : 1;
  padding : clamp(20px , 2vw , 50px);
  display : flex;
  justify-content: center;
  background-color: aliceblue;
     
  ${mobile({
     height : '50%'
    })} 
  &>img{
    display : block;
    width : 35%

    ${mobile({
      width : '50%'
    })}
  }
`
const InfoContainer = styled.div`
  flex : 1;
  padding : clamp(20px , 2vw , 50px);
  margin-top: 20px;

  ${mobile({
     height : '50%',
     margin : '0px'
    })} 
  &>h1{
    font-size: clamp(18px , 2vw , 25px);
    margin : 0px;
  }
  &>p{
    margin : 30px 0;
    font-size: clamp(15px , 1.2vw , 20px);
    font-weight: 500;
    ${mobile({
     margin : '10px 0'
    })} 
  }

  &>span{
      font-size: clamp(18px , 2vw , 25px);
  }
`
const FilterContainer = styled.div`
  margin : 50px 0;
  max-width : 70%;
  display: flex;
  justify-content: space-between;
 
 ${mobile({
   maxWidth : '100%',
   margin : '20px 0'
 })}
`
const ColorFilter = styled.div`
  flex : 1;
  display: flex;
  margin-right: 20px;
 
  ${mobile({marginRight : '0px'})}
`
const FilterText = styled.p`
  font-size: 20px;
  margin-right: 10px;
`
const Color = styled.div`
  width : 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
  border : 2px solid black;
  background-color: ${(props)=>props.bg};
  display : flex;
  align-items: center;
  cursor : pointer;
`
const SizeFilter = styled.div`
  flex : 1;
  display: flex;
`
const FilterSelect = styled.select`
  padding : 0 10px;
  font-weight: 700;

`
const FilterOption = styled.option``

const CartContainer = styled.div`
   margin : 50px 0;
  max-width : 70%;
  display: flex;
  justify-content: space-between;

 ${mobile({
   maxWidth : '100%',
   margin : '20px 0'
 })}
  
  &>div{
    flex : 1;
    display: flex;
    align-items: center;
  
   
    &>div{
      margin : 0 5px;
      width : 40px;
      height: 30px;
      border-radius: 15%;
      border : 2px solid teal;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: clamp(10px , 1vw , 15px);
      
    }
  }
  &>button{
     flex : 1;
     padding : 0.3em ;
     background-color: transparent;
     border : 3px solid teal;
     letter-spacing: -0.5px;
     font-weight: 700;
     cursor : pointer;
     font-size: clamp(10px , 1vw , 15px);
     ${mobile({
       marginRight : '20px'
     })}
     &:hover{
        background-color: #f5f3f4;
     }
  }
`


const Product = () => {
 const location = useLocation();
 const dispatch = useDispatch();
 const id = location.pathname.split('/')[2];
 const [product , setProduct] = useState({});
 const [quantity , setQuantity] = useState(1);
 const [color , setColor] = useState('');
 const [size , setSize] = useState('');
 const [error , setError] = useState("");

  useEffect(()=>{
   
    const getProduct =async()=>{
    try{
      const res = await fetch(`https://e-commerce-by-komal.herokuapp.com/api/products/${id}`, {
        method : 'GET',
      })
      const data = await res.json();
      setProduct(data);
      
    
    }catch(err){
        setError(err);
      }
    }

    getProduct();
  }, [id]);

  const handleButton=(type)=>{
     if(type==='increase'){
       setQuantity(quantity + 1)
     }else{
       quantity > 1 && setQuantity(quantity - 1);
     }
  }


const handleCart=()=>{
  dispatch(addProduct({...product , quantity , color , size}))
}


    return (
      <Container>
        <Nav/>
        <Announcement/>
        <Wrapper>
          {error && <p>{error}</p>}
          <ImageContainer>
            <img src={product.img} alt=''/>
          </ImageContainer>
          <InfoContainer>
            <h1>{product.title}</h1>
            <p>{product.desc}</p>
            <span>Rs.{product.price}</span>
            <FilterContainer>
              <ColorFilter>
                <FilterText>Color :</FilterText>
                 {
                 product.color && product.color.map((c)=>{
                   return (<Color onClick={()=>setColor(c)} bg={c} key={c}></Color>)
                 })}
               
              </ColorFilter>
              <SizeFilter>
                <FilterText>Size :</FilterText>
                <FilterSelect  onClick={(e)=>{
                  setSize(e.target.value)}}>
                    {product.size && product.size.map((s)=>{
                      return (<FilterOption 
                        
                        key={s}>{s}</FilterOption>)
                    })}
                  
                </FilterSelect>
              </SizeFilter>
            </FilterContainer>
            <CartContainer>
              <div>
                <Add onClick={()=>handleButton('increase')}/>
                <div>{quantity}</div>
                <Remove onClick={()=>handleButton('decrease')}/>
              </div>
              <button onClick={handleCart}>ADD TO CART</button>
            </CartContainer>
          </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/> 
      </Container>
    )
}

export default Product
