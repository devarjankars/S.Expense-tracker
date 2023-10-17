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

const email=document.getElementById('email');
const passWord=document.getElementById('passWord');
// const signbtn=document.getElementById('signupbtn');
const responsediv=document.getElementById('resdiv');
const loginbtn= document.getElementById('submitbtn');


async function login (e){
    e.preventDefault();

   try{ console.log("loginig");
    let loginObj={
        email:e.target.email.value,
        password:e.target.passWord.value,
    };
   console.log("here obj value",loginObj);
  axios
  .post('http://13.232.55.174:3000/user/login',loginObj)
  .then(logResult=>{
   
     if(logResult.data.message==="true"){
        localStorage.setItem("token", logResult.data.token)
        alert(logResult.data.message);
        window.location.href='/expense';}
        else{
            alert(logResult.data.message);
            location.reload();
            responsediv.innerHTML +=`<div> <p>${logResult.data.message}</p></div>`
        }

}).catch(err=>{console.log(err);});
}   
   catch(err){console.log(err)}

}

 

