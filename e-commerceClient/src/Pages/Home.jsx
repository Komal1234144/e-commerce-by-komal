import styled from 'styled-components';
import Announcement from "../components/Announcement";
import Nav from '../components/Nav';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';


const Container = styled.div`
   max-width : 100vw;
   box-sizing: border-box;
   overflow-x : hidden;
`

const Home=()=>{
   return (
    <Container>
      <Nav/>
      <Announcement/>
      <Slider/>
      <Categories/>
      <Products/>
      <Newsletter/>
      <Footer/>
    </Container>
      
   )
}

export default Home;