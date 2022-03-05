import styled from "styled-components"
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from '../components/Nav';
import Announcement from '../components/Announcement';
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import {mobile} from '../Responsive';

const Container = styled.div`
  max-width : 100vw;
  box-sizing: border-box;
  overflow-x : hidden;
  
  &>div{
   
    &>h1{
      margin : 20px;
      font-size: clamp(25px , 2.8vw , 30px);
      margin-left : 20px;

      ${mobile({margin : '5px',
    })}
  }
  }
  
`
const FilterContainer = styled.div`
  display : flex;
  justify-content: space-between;
  margin : 20px;
 ${mobile({margin : '5px',
    })}
`
const Filter = styled.div`
   display : flex ;
   justify-content: space-evenly;
   
`
const FilterText = styled.p`
  margin-right: 10px;
  font-size: clamp(12px , 1.5vw , 25px);
`
const Select = styled.select`
  margin-right :  10px;
  max-width : 80px;
  font-size: clamp(10px , 1vw , 20px);
`
const Option = styled.option``

const ProductList = () => {
  
 const location = useLocation();
 let category = location.pathname.split("/")[2]
 const [filters , setFilters] = useState({})
 const [sort , setSort] = useState('')

 const handleFilter=(e)=>{
   let filterName = e.target.name
   let value = e.target.value;
  
   setFilters({
     ...filters,
      [filterName] : value
   })
   
 }

 const handleSort = (e)=>{
   setSort(e.target.value) 
 }

    return (
        <Container>
          <Nav/>
          <div style={{marginTop : '11vh'}}>
          <h1>{category}</h1>
          <FilterContainer>
            <Filter>
              <FilterText>Filter Products :</FilterText>
              <Select name="color" onChange={handleFilter} defaultValue='Color'>
                <Option disabled >Color</Option>
                <Option>All</Option>
                <Option>Black</Option>
                <Option>White</Option>
                <Option>Red</Option>
                <Option>Blue</Option>
                <Option>Yellow</Option>
                <Option>Green</Option>
                <Option>Brown</Option>
              </Select>
              <Select name="size" onChange={handleFilter} defaultValue="Size">
              <Option disabled >Size</Option>
              <Option>All</Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
            </Select>
            </Filter>
            <Filter>
              <FilterText>Sort Products :</FilterText>
              <Select onChange={handleSort}>
                <Option>Newest</Option>
                <Option>Price(asc)</Option>
                <Option>Price(desc)</Option>
              </Select>
            </Filter>
          </FilterContainer>
          <Products category={category} filters={filters} sort={sort}/>
          <Newsletter/>
          <Footer/>
          </div>
        </Container>
    )
}

export default ProductList
