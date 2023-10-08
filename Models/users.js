const  Sequelize= require("sequelize");
const sequelize= require('../utils/database');

const user= sequelize.define("user",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true
    },

   password:Sequelize.STRING,
   isPremiumUser:Sequelize.BOOLEAN,
   totalExpenses: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },

});


module.exports=user;