import styled from 'styled-components';
import { categories } from "../data"
import CategoryItem from './CategoryItem';
import { mobile } from '../Responsive';

const Container = styled.div`
  width : 100%;
  height : 70vh;
  box-sizing: border-box;
  display : flex;
  justify-content: space-between;
  padding : 20px;
 
  ${mobile({
   flexDirection : 'column',
   padding : 0
 })}
 
`

const Categories = () => {
    return (
       <Container id="categories">
         {categories.map((item)=>{
            return( <CategoryItem key={item.id} item={item}/>)
         })}
       
       </Container>
    )
}

export default Categories
