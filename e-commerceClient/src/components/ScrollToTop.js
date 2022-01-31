import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
    const location = useLocation()
    const pathname =  location.pathname
  
    useEffect(()=>{
       window.scroll(0,0);
  }, [pathname])
  
    return null;
};
