import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser : null,
  isFetching : false,
  error : false
}

 const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,

     loginStart : (state)=>void(
      state.isFetching = true)
     ,
     loginSuccess : (state, action )=>void(
         state.isFetching = false,
         state.currentUser = action.payload)
    ,
     loginFailure : (state)=>void(
         state.isFetching = false,
         state.error = true)
  },
})

const registerSlice = createSlice({
  name: 'registerUser',
  initialState : {
    success : ''
  },
  reducers: {
    reset: () => initialState,

    setSuccess : (state , action)=>void(
         state.success = action.payload
    ) 
  },
})


export const { loginStart , loginSuccess , loginFailure } = userSlice.actions
export const {setSuccess} = registerSlice.actions;
export const userReducer = userSlice.reducer;
