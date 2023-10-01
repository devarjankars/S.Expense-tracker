const Sequelize = require('sequelize');
const sequelize= new Sequelize("expense-tracker","root","sanjay",{
    dialect:"mysql",
})

module.exports=sequelize;