 
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

 



document.addEventListener('DOMContentLoaded',getAllexpense)