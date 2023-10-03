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
                res.status(200).redirect('/')
               
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
        const email=req.body.email;
        const password=req.body.password;
        console.log("inside post data");
    
        User.findAll({where:{ email:email }}).then(user=>{
            if(user){
        
                bcrypt.compare(password,user.password, (err,result)=>{
                if(err){
                    return res.status(500).json({sucess:false, message:"something went wrong"})
                }
                if(result===true){
                   
                    res.redirect('/expense');
                }
                else{
                    res.status(401).json({sucess:false, message:"Wrong password"})
    
                }
                })  
            }
            else{
                res.status(404).json({message:"User not found Please signUp"});
            }
        })


    }catch(err){ console.log(err); }
};