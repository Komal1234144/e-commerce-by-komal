const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = async(req, res , next) =>{ 
    const authHeader = req.headers.token;

    !authHeader && res.status(401).send('You are not authenticated');
   
      const token = authHeader.split(" ")[1];
      //It is important to put a space after Bearer in replace method 
      //so that the space before actual token can also be removed
      //a single extra space can change the game. 
      //Three types of splitting :- 1. split("") will split each letter and put them in array.
      // 2. split(" ") will split the string into words rather than letters.
      //3. split("some letter present in the string") will return an array of string splitted with the letter metioned.      
    
      try{ 
         const user =  await jwt.verify(token , process.env.SEC_KEY);
         req.user = user ;
         next()    
      }catch(err){
          res.status(403).send('Token is not valid');
      }
}

const verifyAndFind = (req,res,next)=>{
    verifyToken(req, res , ()=>{
        
        if(req.user.id === req.params.userId || req.user.isAdmin){
            next()
        }else{
            res.status(403);
        }
    })
}

const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req , res , ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(503).send('You are not an admin')
        }
    })
}

module.exports = {verifyToken , verifyAndFind , verifyTokenAndAdmin};