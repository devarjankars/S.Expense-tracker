
 
 const alldata=document.getElementById('result');
 const buyPremium=document.getElementById('buyPremium');
const premiumBtn=document.getElementById ('premium')
//const dfile=document.getElementById('DownloadFile');
const dtrack=document.getElementById ('dlog')

 let getAllexpense= async()=>{
   try{
      const token=localStorage.getItem("token");
       const res=await axios.get(`http://13.232.55.174:3000/expense/allExpense/1`,{ headers: {
         Authorization : token
         }
       })
       console.log(res.data);
       res.data.expenses.forEach(ele => {
        showOn(ele);
       })
       const pageig= document.getElementById('pageig')
for (let index = 1; index <= res.data.totalPages; index++) {
  const li = document.createElement("li");
      const a = document.createElement("a");
      li.setAttribute("class", "page-item");
      a.setAttribute("class", "page-link");
      a.setAttribute("href", "#");
      a.appendChild(document.createTextNode(index));
      li.appendChild(a);
      pageig.appendChild(li);
      a.addEventListener("click", pageign);
    }
  

       downlodH();
       ;}
   catch(err){
    console.log(err);}}

 let showOn =(expense)=>{
 

    alldata.innerHTML +=`<div  class="card" style="width: 10rem;">
    <p class="card-text">${expense.id}</p><p>${expense.amount}</p> <p class="card-text">${expense.discription}</p>
    <p class="card-text">${expense.expenseOn}</p>

    <span class="">
     <button class="btn-dark"  onclick="editExp(this)" > Edit</button>
     <button class="btn-danger" onclick="delExp(this)">Delete</button>
    </span>
 </div>`;


  
}




 
 async function pageign(e){
  try{
  const pageno=e.target.textContent;
  console.log(pageno);
  const token = localStorage.getItem("token");
  const res = await axios.get(
    `http://13.232.55.174:3000/expense/allExpense/${pageno}`,
    { headers: { Authorization: token } }
  );
  console.log(res.data.expenses);
  alldata.innerHTML="";
       res.data.expenses.forEach(ele => {
        
        showOn(ele);
       })
      }
      catch(err){
        console.log(err);
      }
 }



 let editExp=(e)=>{

 }

 let delExp=(e)=>{

  let pEle= e.parentElement.parentElement;
  let id=pEle.children[0].innerHTML
  console.log(id)
  const token=localStorage.getItem('token')
  axios.get(`http://13.232.55.174:3000/expense/deleteExpense/${id}`,{ headers: {
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
   const currentDate = new Date();
   const day = currentDate.getDate();
   const month = currentDate.getMonth() + 1;
   const year = currentDate.getFullYear();

   // add leading zeros to day and month if needed
   const formattedDay = day < 10 ? `0${day}` : day;
   const formattedMonth = month < 10 ? `0${month}` : month;

   // create the date string in date-month-year format
   const dateStr = `${formattedDay}-${formattedMonth}-${year}`;
   const expObj={
  date:dateStr,
 Amt:e.target.Amt.value,
 discription:e.target.discription.value,
expenseOn:e.target.expenseOn.value,
   }
 console.log(e);

const token=localStorage.getItem('token')
 axios.post(`:3000/expense/addExpense`,expObj,{ headers: {
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
    "http://13.232.55.174:3000/purchase/premiumMembership",
    { headers: { Authorization: token } }
  );
  console.log("go on");
  var option={
    key:res.data.key_id,
    order_id:res.data.order.id,
    handler: async function (response){
      const res = await axios.post(
        "http://13.232.55.174:3000/purchase/updateTransactionStatus",
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

async function leaderbord (){
  
    try{
       const token=localStorage.getItem("token");
        const res=await axios.get(`http://13.232.55.174:3000/Premium/leaderBord`,{
          headers: { Authorization: token },
        })
        
        console.log(res);
        //name"SANJAY"
//totalExpense
      res.data.forEach(ele=>
       premiumBtn.innerHTML +=`<div><p>${ele.name}__${ele.totalExpenses}</div>`);
       console.log (res.data);
      }
    catch(err){
     console.log(err);}}






async function isPremiumUser() {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://13.232.55.174:3000/user/isPremiumUser", {
    headers: { Authorization: token },
  })
  console.log(res.data);
  if (res.data.isPremiumUser) {
        buyPremium.style.visibility = 'hidden';
    
        premiumBtn.innerHTML=`<div><p>Welcom Your premium User<p><br>
        <a href="http://13.232.55.174:3000/reports/getReportsPage">Visit Report !</a>
        <Button type="submit" class="btn btn-dark" onclick="leaderbord(this)">LeaderBoard </Button></div>

        `

      }
  
}
async function dFile (){

  try{
    const token=localStorage.getItem("token");
    const  res=await axios.get(`http://13.232.55.174:3000/expense/download`, {
      headers: { Authorization: token },
    })
  if(res.status===200){
    var a= document.createElement('a');
    a.href=res.data.downloadexp
    a.download='Expense.txt'
    a.click();

    alert('your Expense is Downloaded')
   

  }
  else{
    throw new Error(res.data.message)
  }
  }
  catch(err){
    console.log(err);
  }
}

  async function downlodH(){
  try{
    const token=localStorage.getItem("token");
  const  result=await axios.get(`http://13.232.55.174:3000/expense/allDfile`, {
      headers: { Authorization: token },
    }) 
    console.log(result);
      result.data.dFUrl.forEach(link=>{
        dtrack.innerHTML +=`<div><p>${link.id}<a href="${link.filename}">Click here</a></p></div>`
      })
        
    
}
catch(err){
  console.log(err);
}
}
 
document.addEventListener('DOMContentLoaded' ,isPremiumUser);
document.addEventListener('DOMContentLoaded', getAllexpense)
buyPremium.addEventListener('click', PremiumPurchase)
//dfile.addEventListener('click',dFile) 
