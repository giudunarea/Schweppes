function showPassRegister() {
  var x = document.getElementById("password_register");
  var y = document.getElementById("confirmpassword_register");
  if (x.type === "password") {
    x.type = "text";
   
  } else {
    x.type = "password";
   
  }
  if (y.type === "password") {
    y.type = "text";
   
  } else {
    y.type = "password";
   
  }
}

function showPassLogin() {
  var z = document.getElementById("password_login");
  var w = document.getElementById("confirmpassword_login");
  if (z.type === "password") {
    z.type = "text";
   
  } else {
    z.type = "password";
   
  }
  if (y.type === "password") {
    w.type = "text";
   
  } else {
    w.type = "password";
   
  }

}
const eye = document.getElementById('eyeicon');

eye.addEventListener('click', function() {
  eye.classList.toggle('clicked');
  eye.classList.toggle('fa-eye')
  eye.classList.toggle('fa-eye-slash')
});


