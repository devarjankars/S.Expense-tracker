require('dotenv').config();
const express= require('express');
const app=express()
const bodyParser=require('body-parser') ;
const userRoute=require('./Routes/userRoute');
const sequelize = require('./utils/database');
const expenseRoute=require('./Routes/expenseRoute');
const cors=require('cors');
app.use(cors());


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Users=require('./Models/users');
const Expense=require('./Models/expenseModel');



app.use('/',userRoute);

app.use('/expense',expenseRoute)

Users.hasMany(Expense);
Expense.belongsTo(Users);


sequelize.sync()
.then(()=>{
    app.listen(3000);
})
.catch((err)=>{console.log(err);})


