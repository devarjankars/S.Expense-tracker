const express=require('express');
const router=express.Router();
router.use(express.static("public"));
const controllers=require('../Controllers/usercontrollers');

router.use(express.static("public"));

router.get('/', controllers.getSignPage);

router.get('/loginPage',controllers.getLoginPage)

router.post('/user/login',controllers.postloginData);

router.post('/user/signUp',controllers.PostuserData);


 
module.exports=router;
