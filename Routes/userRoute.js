const express=require('express');
const router=express.Router();
router.use(express.static("public"));
const controllers=require('../Controllers/usercontrollers');
const authy=require('../middleware/Auth')
router.use(express.static("public"));

//isPremiumUser
router.get('/', controllers.getSignPage);
router.get('/user/isPremiumUser',authy, controllers.getPremiumUser)

router.get('/loginPage',controllers.getLoginPage)

router.post('/user/login',controllers.postloginData);

router.post('/user/signUp',controllers.PostuserData);


 
module.exports=router;
