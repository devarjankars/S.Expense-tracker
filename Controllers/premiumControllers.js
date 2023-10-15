const User=require('../Models/users');
const sequelize=require('../utils/database');

exports.getLeraderBord=async(req,res,next)=>{
    try{
       
        User.findAll( {attributes: [
            [sequelize.col("name"), "name"],
            [sequelize.col("totalExpenses"), "totalExpenses"],
          ],
          order: [[sequelize.col("totalExpenses"), "DESC"]],
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
