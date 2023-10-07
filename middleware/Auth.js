const jwt =require ('jsonwebtoken');
const User=require('../Models/users');

const authenticate = (req,res,next)=>{
    try{

const token=req.header("Authorization");
console.log(token)
const user=jwt.verify(token, process.env.TOKEN);
console.log(user)
     User.findByPk(user).then(user=>{
     req.user=user;
     console.log(user);
     next();
     }).catch(err=>{
        console.log(err);
     })
    }catch(err){
        console.log(err);
    }

}
module.exports=authenticate;