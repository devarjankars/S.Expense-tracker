 
 const alldata=document.getElementById('result');
 const buyPremium=document.getElementById('buyPremium');


 let getAllexpense= async()=>{
   try{
      const token=localStorage.getItem("token");
       const res=await axios.get(`http://localhost:3000/expense/allExpense`,{ headers: {
         Authorization : token
         }
       })
       console.log(res.data);
       res.data.forEach(ele => {
        showOn(ele);
       });}
   catch(err){
    console.log(err);}}

 let showOn =(expense)=>{

    alldata.innerHTML +=`<div class ="col-xs-12 col-md-8">
    <p>${expense.id}</p><div>${expense.amount}</div> <div>${expense.discription}</div>
    <p>${expense.expenseOn}</p>

    <span class="">
     <button class="btn-dark"  onclick="editExp(this)" > Edit</button>
     <button class="btn-danger" onclick="delExp(this)">Delete</button>
    </span>
 </div>`;

 }


 let editExp=(e)=>{

 }

 let delExp=(e)=>{

  let pEle= e.parentElement.parentElement;
  let id=pEle.children[0].innerHTML
  console.log(id)
  const token=localStorage.getItem('token')
  axios.get(`http://localhost:3000/expense/deleteExpense/${id}`,{ headers: {
   Authorization : token,
   }
 }).then((k=>{
   console.log(k);
   pEle.innerHTML=``;
   

  })).catch(err=>{
   console.log(err);
  })

 }
 let addExp=(e)=>{
   e.preventDefault();
   const expObj={
 Amt:e.target.Amt.value,
 discription:e.target.discription.value,
expenseOn:e.target.expenseOn.value,
   }
 console.log(e);

const token=localStorage.getItem('token')
 axios.post(`http://localhost:3000/expense/addExpense`,expObj,{ headers: {
   Authorization : token,
   }
 }).then((k=>{
   console.log(k);
   window.location.reload();
   

  })).catch(err=>{
   console.log(err);
  }) }
let PremiumPurchase=async()=>{
  const token =localStorage.getItem('token');
  const res = await axios.get(
    "http://localhost:3000/purchase/premiumMembership",
    { headers: { Authorization: token } }
  );
  console.log("go on");
  var option={
    key:res.data.key_id,
    order_id:res.data.order.id,
    handler: async function (response){
      const res = await axios.post(
        "http://localhost:3000/purchase/updateTransactionStatus",
        {
          order_id: option.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );
      console.log(res);
      alert(
        "Welcome to our Premium Membership, You have now access to Reports and LeaderBoard"
      );
      window.location.reload();
      localStorage.setItem("token", res.data.token);
    }
  
  }
  const rzp1 = new Razorpay(option);
  rzp1.open();
  e.preventDefault();
}

async function isPremiumUser() {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:3000/user/isPremiumUser", {
    headers: { Authorization: token },
  })
  console.log(res.data);
  if (res.data.isPremiumUser) {
    
        buyPremium.innerHTML=`<p>Welcom Your premium User<p><br>
        <div><Button class="btn btn-dark" onclick="Leaderbord()">LeaderBoard </Button></div>
        `

      }
  
}
let Leaderbord=async()=>{
  let getAllexpense= async()=>{
    try{
      // const token=localStorage.getItem("token");
        const res=await axios.get(`http://localhost:3000/expense/allExpense`)
        
       // console.log(res.data);
        res.data.forEach(ele => {
         showOn(ele);
        });}
    catch(err){
     console.log(err);}}
}

 

 
buyPremium.addEventListener('click', PremiumPurchase)

document.addEventListener('DOMContentLoaded' ,isPremiumUser);
document.addEventListener('DOMContentLoaded', getAllexpense)