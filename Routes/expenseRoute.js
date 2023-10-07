const express=require('express');
const router=express.Router();
router.use(express.static("public"));
const controllers=require('../Controllers/expenseControllers');
router.use(express.static("public"));
const authy=require('../middleware/Auth')

router.get('/',controllers.getPage)
router.get('/deleteExpense/:id', authy,controllers.delExp)
router.get('/allExpense',authy,controllers.getAllexpense);

router.post('/addExpense',authy,controllers.addExpense);




module.exports=router;