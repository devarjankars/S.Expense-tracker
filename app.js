const express= require('express');
const app=express()
const bodyParser=require('body-parser') ;
const userRoute=require('./Routes/userRoute');
const sequelize = require('./utils/database');
const expenseRoute=require('./Routes/expenseRoute');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/',userRoute);

app.use('/expense',expenseRoute)



sequelize.sync()
.then(()=>{
    app.listen(3000);
})
.catch((err)=>{console.log(err);})


