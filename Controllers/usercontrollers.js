const path= require('path');
const User=require('../Models/users');
const sequelize=require('../utils/database');



exports.getLoginPage= async (req, res, next)=>{
    try{
    res.sendFile(path.join(__dirname , "../", "public","views","signUp.html"));
    }
    catch(err){
        console.log(err);
    }
};
exports.PostuserData= async(req, res, next )=>{
 try{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const userObj={
        name:name,
        email:email,
        password:password,
    }
     User.findOne({where:{email:email}})
    .then((user)=>{
        if(user){
            res.status(409).send(`<script>alert('User emailalready prsent!'); window.location.href='/'</script>`)
        }
        else{
            User.create(userObj);
            console.log("user created ");
            res.status(200).redirect('/')
        }
        

    }).catch(err=>{
        console.log(err);
    })




    }
    catch(err){
        console.log(err);
    }
}