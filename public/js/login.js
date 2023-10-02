// async function saveUser(e) {
//   try {  
//     e.prventDefault();
//     console.log(e.terget.name.value)
//     let userDetails={
//         name:e.terget.name.value,
//         email:e.terget.email.value,
//         phoneno:e.terget.pno.value,
//     }
//     console.log(userDetails);
//   const response= await axios.post(``,userDetails);
//   if(response.status===201){
//     console.log("success");
//     window.location.href='../views/signUp.html';
//   }
//   else{
//     console.log("failed to login");
//   }
// }
// catch(err){
//     console.log(err);
// }

// }
// console.log("hello");

// const emailbtn=document.getElementById('email').value;
const pwd=document.getElementById('pwd').value;
const signbtn=document.getElementById('signupbtn');
const responsediv=document.getElementById('resdiv');

console.log("sds",pwd);

console.log(pwd);

function loging(e){
    e.preventDefault();
   const email=e.target.email.value;
   const pwd=e.target.pwd.value;
   
    console.log("loginig");
    let loginObj={
        email:email,
        password:pwd.value,
    };
   console.log("here obj value",loginObj);
    axios.post('http://localhost:3000/user/login', loginObj)
    .then(result=>{
        console.log(result);

        responsediv.innerHTML +=`<span><p class="text-danger">${result.data.message}</p></span>`
        console.log("end");
   })
   

.catch(err=>{console.log(err)})

}
 

//signbtn.addEventListener('click',signUp)
