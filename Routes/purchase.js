const express=require('express');
const router=express.Router();
router.use(express.static("public"));
const controllers=require('../Controllers/purchaseController');
router.use(express.static("public"));
const authy=require('../middleware/Auth')


//"http://localhost:3000/purchase/premiumMembership

router.get('/premiumMembership',authy, controllers.getPremium);
router.post(   "/updateTransactionStatus", authy,controllers.updatePremium );


module.exports=router;