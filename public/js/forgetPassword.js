const resetPasswordLinkBtn = document.getElementById("resetPass");

async function sendMail() {
  try {
    const email = document.getElementById("typeEmail").value;
    const res = await axios.post("http://localhost:3000/password/sendMail", {
      email: email,
    });
    alert(res.data.message);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
    window.location.reload();
  }
}

resetPasswordLinkBtn.addEventListener("click", sendMail);