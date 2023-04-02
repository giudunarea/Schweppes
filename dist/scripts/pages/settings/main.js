const buttons = [
  document.getElementById('acc-button'),
  document.getElementById('adm-button'),
]

const pages = [
  document.getElementById('acc-page'),
  document.getElementById('adm-page'),
]

for (let i = 0; i < buttons.length; i++) {
  if (pages[i]) {
    buttons[i].addEventListener('click', function() {
      for (let k = 0; k < pages.length; k++) {
        pages[k].classList.add("hidden")
      }
      pages[i].classList.remove("hidden")
    })
  }
}

function push_newsletter() {
  fetch("https://" + window.location.hostname + "/newsletters/add", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: document.getElementById('title_input').value,
      html: document.getElementById('file_input').value
    })
  })
}