 
 const alldata=document.getElementById('result');
 let getAllexpense= async()=>{
   try{
       let res=await axios.get(`http://localhost:3000/expense/allExpenses`)
       res.data.forEach(element => {
        showOn(element)
       });}
   catch(err){
    console.log(err);}}

 let showOn =(expense)=>{
    alldata.innerHTML+=`<div>
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