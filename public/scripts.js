var socket = io();
      
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

function darkMode() {
  // var element = document.body;
  document.body.classList.toggle("dark-mode");
  document.getElementById('darkModeButton').classList.toggle("darkModeButton-light");
  }
  
// var darkmodeButtonToggle = document.getElementById('darkMode').src;
// if (darkModeOn = true) {
//   document.getElementById('darkMode').classList.toggle("darkMode-light");
//   var darkModeOn = false;
// }
// else {
// document.getElementById('darkMode').classList.toggle("darkMode-dark");
// var darkModeOn = true;
// }
