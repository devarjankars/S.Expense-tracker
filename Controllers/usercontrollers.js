const path= require('path');
const User=require('../Models/users');
const sequelize=require('../utils/database');
const bcrypt =require('bcrypt')





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
 
     User.findOne({where:{  email  }})
    .then((user)=>{
        if(user){
            res.status(409).send(`<script>alert('User email already prsent!'); window.location.href='/'</script>`)
        }
        else{
            bcrypt.hash(password, 10 , async (err, hash)=>{
              await User.create({
                    name:name,
                    email:email,
                    password:hash
                });
                
                console.log("user created ");
                res.redirect('/')
               
            })
        
           
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
        const mail=req.body.email;
        const pass=req.body.password;
        
        console.log("inside post data");
    
       await User.findAll({where:{ email:mail }}).then(user=>{
            if(user){
              console.log(user[0].password);
                bcrypt.compare(pass, user[0].password, (err,response)=>{
                    console.log(response);
                if(err){
                    console.log("hello err1");
                    return res.json({sucess:false, message:"something went wrong"})
                }
                if(response){
                    console.log("all good");
                    res.json({sucess:true, message:"true"})
                }
                else{
                    console.log("hello err2");
                    res.json({sucess:false, message:"Wrong password"})
    
                }
                console.log("end");
                })  
            }
            else{
                res.status(404).json({message:"User not found Please signUp"});
            }
        })


    }catch(err){ console.log(err); }
};