import Home from "./Pages/Home";
import ProductList from './Pages/ProductList';
import Product from "./Pages/Product";
import Register from './Pages/Register';
import Login from './Pages/Login';
import Cart from "./Pages/Cart";
import StripeContainer from "./components/StripeContainer";
import { ScrollToTop } from "./components/ScrollToTop";
import { Routes , Route, BrowserRouter, Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux';

function App() {
  let user = useSelector((state)=>state.persistedReducer.user.currentUser)
  
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/products/:category" element={<ProductList/>} />
         <Route path="/product/:id" element={<Product/>} />
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/login" element={ user? <Navigate to="/"/> : <Login/>}/>
         <Route path ='/register' element={user? <Navigate to="/"/> : <Register/>}/>
         <Route path="/checkout" element={<StripeContainer/>}/>
         <Route path="/orders" />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
