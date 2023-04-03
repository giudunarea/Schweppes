window.addEventListener("DOMContentLoaded", (event) => {
  let logout_dropdown_button = document.getElementById("logout-dropdown-button");
if(logout_dropdown_button){
  logout_dropdown_button.addEventListener('click',function(){
    fetch("https://" + window.location.hostname + "/logout", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST"
  })
.then(function(res){
  window.location.href = "/";
})
.catch(function(res){ console.log(res) })
  })
}
});
