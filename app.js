require('dotenv').config();
const express= require('express');
const app=express()
const bodyParser=require('body-parser') ;

//routes
const userRoute=require('./Routes/userRoute');
const sequelize = require('./utils/database');
const expenseRoute=require('./Routes/expenseRoute');
const purchaseRoute=require('./Routes/purchase')
const premiumRoute=require('./Routes/premiumRoute');
const forgetPasswordRoute=require('./Routes/forgetPasswordRoute');
//body parser and cors satic 
const cors=require('cors');
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//databases
const Users=require('./Models/users');
const Expense=require('./Models/expenseModel');
const Order=require('./Models/order');


//Routes
app.use('/',userRoute);
app.use('/expense',expenseRoute);
app.use('/purchase', purchaseRoute);
app.use('/premium', premiumRoute);
app.use('/password',forgetPasswordRoute);


//Associations with Expense
Users.hasMany(Expense);
Expense.belongsTo(Users);

//association order to user
Users.hasMany(Order);
Order.belongsTo(Users);


/// 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 -api key
//db all sync
//{force:true}

sequelize.sync({force:true})
.then(()=>{
    app.listen(3000);
})
.catch((err)=>{console.log(err);})


