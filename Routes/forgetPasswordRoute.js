const express=require('express');
const router=express.Router();
router.use(express.static("public"));
const controllers=require('../Controllers/forgetPasswordControllers');



router.get('/ForgotPassword', controllers.getForgetPasswordPage);
router.post('/sendMail', controllers.getRestMail)
router.get('/resetPasswordPage/:requestId',controllers.getresetPasswordPage);
router.post('/updatePassword', controllers.updatePassword);




module.exports=router;