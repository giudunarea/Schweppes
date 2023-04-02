const inputs = [
  document.getElementById('username_login'),
  document.getElementById('password_login'),
  document.getElementById('submit')
]

inputs[2].addEventListener('click',async function(){
  fetch("https://" + window.location.hostname + "/login", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username:inputs[0].value,
    password:inputs[1].value
  })
  }).then(async function(data){
    let json = await data.json()
    if (json.message == "Authenticated"){
      window.location.href = '/'
    }else{
      window.alert(json.message)
    }
  })
})

 close_popup.addEventListener("click", function() {
  popup.classList.remove("show");
  error_list = [];
 })
