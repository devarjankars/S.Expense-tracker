const path= require('path');
const User=require('../Models/users');
const sequelize=require('../utils/database');
const { log } = require('console');



exports.getSignPage= async (req, res, next)=>{
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
};



exports.getLoginPage= async (req, res, next)=>{
    try{
    res.sendFile(path.join(__dirname , "../", "public","views","login.html"));
    }
    catch(err){
        console.log(err);
    }
};


exports.postloginData=async(req, res, next )=>{
    try{
        const logmail=req.body.email;
        const logpwd=req.body.password;
        let loginObj={
            email:logmail,
            password:logpwd
        };
        console.log("inside post data");
        User.findOne({where:{email:logmail,}}).then(result=>{
            if(result){
                 console.log(result);
                if(result.password===logpwd){
                    return res
                    .status(200)
                    .json({ success: true, message: "valid user!" })
                }
                else{
                    return res.status(401) .json({ success: false, message: "Something went Wrong!" })
                }
            }
            else{
                return res
              .status(404)
              .json({ success: false, message: "User not Available signUP!" })
            }

        }).catch(err=>{  console.log(err); })


    }catch(err){ console.log(err); }
};