const express=require('express');
const router=express.Router();
router.use(express.static("public"));
const controllers=require('../Controllers/expenseControllers');
router.use(express.static("public"));

router.get('/',controllers.getPage)
router.get('/deleteExpense/:id',controllers.delExp)
router.get('/allExpense',controllers.getAllexpense);

router.post('/addExpense',controllers.addExpense);




module.exports=router;