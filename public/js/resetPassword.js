const resetPassword= document.getElementById('resetPassword');

let updatedPassword=async()=>{
    try{
        const newpassword=document.getElementById('newPassword').value;
        console.log(newpassword);
        let res=await axios.post("http://13.232.55.174:3000/password/updatePassword",{password:newpassword})
        alert(res.data.message);
        window.location.href='/';


    }
 catch(err){
        console.log(err);
        alert(err.response.data.message);
        window.location.reload();
    }
}










resetPassword.addEventListener('click',updatedPassword)