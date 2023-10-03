const Sequelize= require('sequelize');
const sequelize= require('../utils/database');
 const expense=sequelize.define("expense",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
    amount:{
        type:Sequelize.DOUBLE,
        allowNull:false,
    }
    ,
    discription:Sequelize.TEXT,
    expenseOn:Sequelize.STRING,
 });

 module.exports=expense;