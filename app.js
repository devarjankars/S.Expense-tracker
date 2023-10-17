require('dotenv').config();
const express= require('express');
const app=express()
const bodyParser=require('body-parser') ;
const helmet=require('helmet');
//const compression=require('compression')
const morgan=require('morgan')
const  fs=require('fs');
//routes
const userRoute=require('./Routes/userRoute');
const sequelize = require('./utils/database');
const expenseRoute=require('./Routes/expenseRoute');
const purchaseRoute=require('./Routes/purchase')
const premiumRoute=require('./Routes/premiumRoute');
const forgetPasswordRoute=require('./Routes/forgetPasswordRoute');
reportsRoute=require('./Routes/reportRoute');
//body parser and cors satic 
const cors=require('cors');
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


//databases
const downloadFiles=require('./Models/downloadFiles');
const restPassword=require('./Models/restPassword')
const Users=require('./Models/users');
const Expense=require('./Models/expenseModel');
const Order=require('./Models/order');
const user = require('./Models/users');
const path = require('path');


//Routes
app.use('/',userRoute);
app.use('/expense',expenseRoute);
app.use('/purchase', purchaseRoute);
app.use('/premium', premiumRoute);
app.use('/password',forgetPasswordRoute);
app.use("/reports", reportsRoute);

const accesslogstream=fs.createWriteStream(path.join(__dirname,"access.log"),{flags:'a'})
app.use(helmet());
//app.use(compression());
app.use(morgan('combined',{stream:accesslogstream}));
//Associations with Expense
Users.hasMany(Expense);
Expense.belongsTo(Users);

//association order to user
Users.hasMany(Order);
Order.belongsTo(Users);
//forgotpassword
 restPassword.belongsTo(Users);
 Users.hasMany(restPassword);
//download track
Users.hasMany(downloadFiles);
downloadFiles.belongsTo(Users);

 //report


 //
 

//db all sync
//{force:true}

sequelize.sync()
.then(()=>{
    app.listen(process.env.PORT ||3000);
})
.catch((err)=>{console.log(err);})


