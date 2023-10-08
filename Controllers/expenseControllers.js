const path= require('path');
const Expense=require('../Models/expenseModel');
const sequelize=require('../utils/database');
const { log } = require('util');
const { where } = require('sequelize');
const User= require('../Models/users');



exports.getPage= async(req, res, next)=>{
    try{
        res.sendFile(path.join(__dirname , "../", "public","views","ExpensePage.html"));
        }
        catch(err){
            console.log(err);
        }

}
exports.getAllexpense= async(req, res, next)=>{
    try{
       const expense= await Expense.findAll( {where:{userId:req.user.id}});
       res.json(expense);
       
        }
        catch(err){
            console.log(err);
        }

}
exports.addExpense= async(req, res, next)=>{
    const t = await sequelize.transaction();
    try{
        console.log(req.body);
        const amount =req.body.Amt;
       const discription=req.body.discription
       const expenseOn=req.body.expenseOn
       const userId=req.user.id;
       let expensObj={
        amount :amount,
        discription:discription,
        expenseOn:expenseOn,
        userId:userId,
        
       }
       const totalExpenses=Number(req.user.totalExpenses) + Number(amount)
       console.log(expensObj);
          await  Expense.create(expensObj);
         await User.update({ totalExpenses:totalExpenses,} ,{where:{id:req.user.id} },{ transaction: t })
         await t.commit();
         res.redirect('/expense');
        }
        catch(err){
           await t.rollback();
            console.log(err);
        }

}
exports.delExp=async(req, res, next)=>{
    const id = req.params.id;
    try {
      const expense = await Expense.findByPk(id);
      await User.update(
        {
          totalExpenses: req.user.totalExpenses - expense.amount,
        },
        { where: { id: req.user.id } }
      );
      await Expense.destroy({ where: { id: id, userId: req.user.id } });
      res.redirect("/expense");
    } catch (err) {
      console.log(err);
    }
  };
