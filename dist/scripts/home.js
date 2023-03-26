function showPass() {
  var x = document.getElementById("password");
  var y = document.getElementById("confirmpassword");
  var div = document.getElementById("eyeeye"); 
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

const eye = document.getElementById('eyeicon');

eye.addEventListener('click', function() {
  eye.classList.toggle('clicked');
  eye.classList.toggle('fa-eye')
  eye.classList.toggle('fa-eye-slash')
});


