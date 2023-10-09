const User=require('../Models/users');
const path=require('path');
const sib=require('sib-api-v3-sdk');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid')
const ResetPassword=require('../Models/restPassword');
const user = require('../Models/users');
const saltRounds = 10;


const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
  };
   
exports.getForgetPasswordPage= async( req, res, next)=>{
    try {
        res
          .status(200)
          .sendFile(
            path.join(__dirname , "../", "public","views","ForgotPassword.html")
          );
      } catch (error) { 
        console.log(error);
      }
};


exports.getRestMail= async(req, res, next)=>{

try {
    const email = req.body.email;
    const requestId = uuidv4();

    const recepientEmail = await User.findOne({ where: { email: email } });

    if (!recepientEmail) {
      return res
        .status(404)
        .json({ message: "Please provide the registered email!" });
    }

    const resetRequest = await ResetPassword.create({
      id: requestId,
      isActive: true,
      userId: recepientEmail.dataValues.id,
    });

    const client = sib.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.API_KEY;
    const transEmailApi = new sib.TransactionalEmailsApi();
    const sender = {
      email: "devarjankars@gmail.com",
      name: "Sanjay",
    };
    const receivers = [
      {
        email: email,
      },
    ];
    const emailResponse = await transEmailApi.sendTransacEmail({
      sender,
      To: receivers,
      subject: "Expense Tracker Reset Password",
      textContent: "Link Below",
      htmlContent: `<h3>Hi! We got the request from you for reset the password. Here is the link below >>></h3>
      <a href="http://localhost:3000/password/resetPasswordPage/{{params.requestId}}"> Click Here</a>`,
      params: {
        requestId: requestId,
      },
    });
    return res.status(200).json({
      message:
        "Link for reset the password is successfully send on your Mail Id!",
    });
  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: "failed changing password" });
  }
};


exports.getresetPasswordPage= async(req,res,next)=>{

try {
        res
          .status(200)
          .sendFile(
            path.join(__dirname , "../", "public","views","resetPassword.html")
          );
      } catch (error) { 
        console.log(error);
      }
}

exports.updatePassword= async(req,res,next)=>{
try{
  const password=req.body.password;
  const requestId = req.headers.referer.split("/");
console.log(requestId);
console.log(password);
 let resetPass= await ResetPassword.findAll({where:{
    id:requestId[requestId.length-1], isActive:true
  }})
  if(resetPass[0]){
    const newhashpassword= await hashPassword(password);
        const userId= resetPass[0].dataValues.userId;
        const result=await User.update({password:newhashpassword},{where:{id:userId}})
     const removeActive= await ResetPassword.findAll({isActive:false},{where:{ id:requestId}})
    return res.status(200).json({message:"updated password succesfully"})
    
  }
  else{
   return res.status(409).json({message:"Link is Expire create another"})
  }
 
  }
catch(err){
  console.log(err);
  return res.status(409).json({message:"somthing went wrong "})
}
}






