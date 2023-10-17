const downloadTrack=require('../Models/downloadFiles');
const Expense= require('../Models/expenseModel');
const sequelize=require('../utils/database');
const AWS = require('aws-sdk')



function  uploadToS3(data, filename){
 const BUCKET_NAME='expense.tracker.project';
 const IAM_USER_KEY=`${process.env.IAM_USER_KEY}`;
 const IAM_USER_SECRET=`${process.env.IAM_USER_SECRET}`;


let s3bucket= new  AWS.S3({
    accessKeyId:IAM_USER_KEY,
    secretAccessKey:IAM_USER_SECRET,
    Bucket:BUCKET_NAME
})


  let params={
     Bucket:BUCKET_NAME,
     Key:filename,
     Body:data,
     ALC:'public-read'
  }
  return new Promise((Resolv, Reject)=>{
    s3bucket.upload(params,(err, s3res)=>{
        if(err){
            console.log(err);
            Reject(err)
        }
        else{
            //console.log(s3res);
        }  Resolv(s3res.Location);
      })
  })
  


}
const getDownloadFile = async (req,res,next)=>
{
    try{
        const expense= await Expense.findAll( {where:{userId:req.user.id}});
        //res.json(expense);
        const userID=req.user.id;
        const stringFile=JSON.stringify(expense)
        const filename=`Exp${userID}/${new Date()}.txt`;
        const downloadexp=  await uploadToS3(stringFile,filename);
        let dtObj={
            filename:downloadexp,
            userId:userID
        }
    const dtrack=await downloadTrack.create(dtObj);
        res.status(200).json({downloadexp, success:true})
         }
         catch(err){
             console.log(err);
             res.status(500).json({message:'smoething went wrong'})
             
 
 }
}


const getAllDfileTrack= async (req,res,next)=>{
     
    try {

   const dFUrl= await downloadTrack.findAll({where:{userId:req.user.id}})
   res.status(200).json({dFUrl})
        
      } catch (err) {
        console.log(err);
      }
    };

module.exports={
    getDownloadFile,

    getAllDfileTrack
}