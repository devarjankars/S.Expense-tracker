const express=require('express');
const router=express.Router();
router.use(express.static("public"));
const controllers=require('../Controllers/usercontrollers');

router.use(express.static("public"));
router.get('/', controllers.getSignPage);
router.get('/loginPage',controllers.getLoginPage)
router.post('/signUp',controllers.PostuserData);
router.post('/login',controllers.postloginData);


 
module.exports=router;
