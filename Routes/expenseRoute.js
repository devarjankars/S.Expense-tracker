const express=require('express');
const router=express.Router();
router.use(express.static("public"));
const controllers=require('../Controllers/expenseControllers');
router.use(express.static("public"));

router.get('/',controllers.getPage)
router.get('/allExpense',controllers.addExpense);

router.post('/addExpense',controllers.addExpense);




module.exports=router;