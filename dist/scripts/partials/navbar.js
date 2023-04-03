function Menu(e) {
  let list = document.querySelector('ul');
  if (e.name === 'close') {
    e.name = 'menu';
    list.style.display = "none"
  } else {
    e.name = 'close';
    list.style.display = "block"
  }
}


document.querySelector('ul').style.display = "block"