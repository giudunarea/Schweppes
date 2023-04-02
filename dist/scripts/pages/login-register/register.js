var inputs = {
  username: document.getElementById("username_register"),
  email: document.getElementById("email_register"),
  password: document.getElementById("password_register"),
  cfr_password: document.getElementById("confirmpassword_register"),
  signup: document.getElementById("signup"),
}
var popup = document.getElementById("popup")
var close_popup = document.getElementById("close_popup")
var error_list = document.getElementById('errors_list')

signup.addEventListener("click", async function() {
  let error = [];
  if (inputs.username.value.length < 8) {
    error.push("Username must have at least 8 characters");
  } else if (inputs.username.value.length > 15) {
    error.push("Username must have at less than 15 characters");
  }
  if (validate(inputs.email.value) == false) {
    error.push("Email is not valid")
  }
  if (inputs.password.value.length > 20) {
    error.push("Password does not meet the requirements");
  } else if (inputs.password.value.length < 8) {
    error.push("Password does not meet the requirements");
  }
  if (inputs.password.value != inputs.cfr_password.value) {
    error.push("Passwords do not match");
  }
  if (error.length != 0) {
    popup.classList.add("show");
    for (let error__ = 0; error__ < error.length; error__++) {
      let newLi = document.createElement("li");
      newLi.innerHTML = error[error__];
      error_list.appendChild(newLi);
    }
  } else {
    fetch("https://" + window.location.hostname + "/register", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: inputs.username.value,
        password: inputs.password.value,
        email: inputs.email.value
      })
    }).then(async function(response) {
      let data = await response.json()
      if (response.status != 200) {
        popup.classList.add("show");
        let newLi = document.createElement("li");
        newLi.innerHTML = data.message;
        error_list.appendChild(newLi);
      } else window.location.href = "/"
    })
  }
});
// popup.style.display = "block";
var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function validate(email) {
  if (!email)
    return false;

  if (email.length > 254)
    return false;

  var valid = tester.test(email);
  if (!valid)
    return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if (parts[0].length > 64)
    return false;

  var domainParts = parts[1].split(".");
  if (domainParts.some(function(part) { return part.length > 63; }))
    return false;

  return true;
}


close_popup.addEventListener("click", function() {
  popup.classList.remove("show");
  error_list = [];
})
