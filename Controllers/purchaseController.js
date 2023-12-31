const Razorpay = require('razorpay');
const Order= require('../Models/order');
const User= require('../Models/users');
 const userController=require('../Controllers/usercontrollers') 
 const jwt =require('jsonwebtoken') 
 function getJwtToken(id){
  console.log(id);
  return jwt.sign(id, process.env.TOKEN);
}
exports.getPremium=(req,res,next)=>{
try{
  const rzp= new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
  //console.log(rzp);
  const amount =2500;
rzp.orders.create({amount,currency:"INR"}, (err,order)=>{
    if(err){
        throw new Error(JSON.stringify( err));
    }
    req.user.createOrder({ orderid:order.id, status:"Pending"})
    .then(()=>{
        console.log("succes");
       return res.status(201).json({order, key_id:rzp.key_id   })
    }).catch(err=>{console.log(err);})
    })

} catch(err){
    console.log(err);
}
}

exports.updatePremium =async (req, res) => {
    try {
      const userId = req.user.id;
      const { payment_id, order_id } = req.body;
      const order = await Order.findOne({ where: { orderid: order_id } });
      const promise1 = order.update({
        paymentid: payment_id,
        status: "SUCCESSFUL",
      });
      const promise2 = req.user.update({ isPremiumUser: true });
  
      Promise.all([promise1, promise2])
        .then(() => {
          return res.status(202).json({
            sucess: true,
            message: "Transaction Successful",
            token:getJwtToken(userId),
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (err) {
      console.log(err);
      res.status(403).json({ error: err, message: "Sometghing went wrong" });
    }
  };