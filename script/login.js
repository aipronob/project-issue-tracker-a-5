document.getElementById("signin-btn").addEventListener("click", function(){
  //1.  get the mobile no.
  const usernameinput = document.getElementById("input-username");
  const username = usernameinput.value;
  console.log(username);

  //2. get the pin
  const inputpassword=document.getElementById("input-password");
  const password = inputpassword.value;
  console.log(password);
  //3. match mobile and pin
  if(username=="admin" && password === "admin123") {
  //3.1 true: alert and move to home page
    alert("login Sucussful")
    window.location.assign("../home.html")
  //3.2 false: return
  } else {
    alert("login Failed");
    return;
  }

});

