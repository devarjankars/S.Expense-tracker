const express=require('express');
const router=express.Router();
router.use(express.static("public"));
const controllers=require('../Controllers/usercontrollers');

router.use(express.static("public"));
router.get('/', controllers.getLoginPage);
router.post('/signUp',controllers.PostuserData);


 
module.exports=router;
