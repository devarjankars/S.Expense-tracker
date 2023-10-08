const express=require('express');
const router=express.Router();
router.use(express.static("public"));
const controllers=require('../Controllers/premiumControllers');
router.use(express.static("public"));
const authy=require('../middleware/Auth')


router.get('/leaderBord',authy,controllers.getLeraderBord);


module.exports=router;