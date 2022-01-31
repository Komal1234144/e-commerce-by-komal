import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  quantity : 0,
  products : [],
  total : 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
     addProduct : (state , action)=>{
         state.quantity += 1;
         state.products.push(action.payload);
         state.total += action.payload.price * action.payload.quantity;
     },
    removeProduct : (state , action) =>{
      
        state.quantity -= 1;
        state.products = state.products.filter((product)=>{
         return product._id !== action.payload.id
        });
        state.total -= action.payload.price * action.payload.quantity

    }
  },
})


export const { addProduct , removeProduct} = cartSlice.actions

export default cartSlice.reducer;