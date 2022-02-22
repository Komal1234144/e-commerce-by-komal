import { loginStart ,loginSuccess , loginFailure  } from "./UserSlice"

export const login=async(dispatch , user)=>{
   dispatch(loginStart())
  
   try{
      const res = await fetch('http://localhost:3001/api/auth/login', {
          method : 'POST',
          headers : {"Content-Type" : 'application/json'},
          body : JSON.stringify(user)
      })
      const data = await res.json()
      console.log(data)
      dispatch(loginSuccess(data));
     
   }catch(err){
       console.log(err)
       dispatch(loginFailure())
       
   }
}

export const register = async(dispatch , user)=>{
   try{
      const res = await fetch('https://e-commerce-by-komal.herokuapp.com/api/auth/register', {
          method : 'POST',
          headers : {"Content-Type" : 'application/json'},
          body : JSON.stringify(user)
      }) 
        const data = await res.json();
      
        if(data.errors){
          return false
        }else{
          return true
    }
      
   }catch(err){
      
       return false
   }
}