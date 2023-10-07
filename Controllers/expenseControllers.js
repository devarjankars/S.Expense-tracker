const path= require('path');
const Expense=require('../Models/expenseModel');
const sequelize=require('../utils/database');
const { log } = require('util');
const { where } = require('sequelize');



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
       console.log(expensObj);
await  Expense.create(expensObj);
  res.redirect('/expense');
        }
        catch(err){
            console.log(err);
        }

}
exports.delExp=async(req, res, next)=>{
    try{
    let id=req.params.id;
  
    await Expense.destroy({
        where: { id: id}, });
      res.redirect('/expense')

    }catch(err){
        console.log(err);
    }

}
