const User=require('../Models/users');
const Expense=require('../Models/expenseModel');
const sequelize=require('../utils/database');

exports.getLeraderBord=async(req,res,next)=>{
    try{
       
        Expense.findAll({
                attributes: [
                  [sequelize.fn("sum", sequelize.col("amount")), "totalExpense"],
                  [sequelize.col("user.name"), "name"],
                ],
                group: ["userId"],
                include: [
                  {
                    model: User,
                    attributes: [],
                  },
                ],
                order: [[sequelize.fn("sum", sequelize.col("amount")), "DESC"]],
              }).then(result=>{
        console.log(result);
        res.status(200).json(result)
              }).catch(err=>{
                console.log(err);
              })}
    catch(err){
        console.log(err);
    }
}
