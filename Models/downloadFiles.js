const Sequelize= require('sequelize');
const sequelize= require('../utils/database');
 const downloadTrack=sequelize.define("downloadTrack",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
    filename :{
        type:Sequelize.TEXT,
        allowNull:false,
    }
    
 });

 module.exports=downloadTrack;