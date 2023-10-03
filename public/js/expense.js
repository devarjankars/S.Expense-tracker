 
 const alldata=document.getElementById('result');

 let getAllexpense= async()=>{
   try{
       const res=await axios.get(`http://localhost:3000/expense/allExpense`)
      // console.log(res.data);
       res.data.forEach(ele => {
        showOn(ele);
       });}
   catch(err){
    console.log(err);}}

 let showOn =(expense)=>{

    alldata.innerHTML +=`<div>
    <p>${expense.id}</p> 
    <p>${expense.amount}</p>
    <p>${expense.discription}</p>
    <p>${expense.expenseOn}</p>
    <span class="">
     <button class="btn-dark" > Edit</button>
     <button class="btn-danger">Delete</button>
    </span>
 </div>`;

 }



document.addEventListener('DOMContentLoaded',getAllexpense)