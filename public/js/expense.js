 
 const alldata=document.getElementById('result');

 let getAllexpense= async()=>{
   try{
      const token=localStorage.getItem("token");
       const res=await axios.get(`http://localhost:3000/expense/allExpense`,{ headers: {
         Authorization : token
         }
       })
      // console.log(res.data);
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
  const token=localStorage.setItem('token')
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
  var option={
    key:res.data.key_id,
    order_id:res.data.order.id,
    handler: async function (response){
      const res = await axios.post(
        "http://localhost:3000/purchase/updateTransactionStatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );
      console.log(res);
      alert(
        "Welcome to our Premium Membership, You have now access to Reports and LeaderBoard"
      );
      window.location.reload();
    }
  
  
  }
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
}


 

  const buyPremium=document.getElementById('buyPremium');
  buyPremium.addEventListener('click', PremiumPurchase)


document.addEventListener('DOMContentLoaded',getAllexpense)