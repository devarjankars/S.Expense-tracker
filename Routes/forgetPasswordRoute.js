const express=require('express');
const router=express.Router();
router.use(express.static("public"));
const controllers=require('../Controllers/forgetPasswordControllers');



router.get('/ForgotPassword', controllers.getForgetPasswordPage);
router.post('/sendMail', controllers.getRestMail)





module.exports=router;