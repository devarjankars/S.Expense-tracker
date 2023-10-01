const express= require('express');
const app=express()
const bodyParser=require('body-parser') ;
const userRoute=require('./Routes/userRoute');
const sequelize = require('./utils/database');
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static("public"));

app.use('/',userRoute);
app.use('/user', userRoute);


sequelize.sync()
.then(()=>{
    app.listen(3000)
})
.catch((err)=>{console.log(err);})


