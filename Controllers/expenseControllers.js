const path= require('path');
const Expense=require('../Models/expenseModel');
const sequelize=require('../utils/database');
const { log } = require('util');



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
       const expense= await Expense.findAll();
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
       let expensObj={
        amount :amount,
        discription:discription,
        expenseOn:expenseOn,
       }
       console.log(expensObj);
await  Expense.create(expensObj);
  res.redirect('/expense');
        }
        catch(err){
            console.log(err);
        }

}
