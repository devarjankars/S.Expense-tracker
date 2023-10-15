const express=require('express');
const router=express.Router();
router.use(express.static("public"));
const controllers=require('../Controllers/expenseControllers');
router.use(express.static("public"));
const authy=require('../middleware/Auth')
const awsSarvices=require('../sarvices/awsS3')

router.get('/',controllers.getPage)
router.get('/deleteExpense/:id', authy,controllers.delExp)
router.get('/allExpense',authy,controllers.getAllexpense);
router.get('/allExpense/:page',authy,controllers.getAllExpensesforPagination);
router.post('/addExpense',authy,controllers.addExpense);
router.get('/download' ,authy, awsSarvices.getDownloadFile)
router.get('/allDfile', authy, awsSarvices.getAllDfileTrack)



module.exports=router;