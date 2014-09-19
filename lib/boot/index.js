// paths includes `lib` by default 
var Something = require('something'); // -> require('./../something')
var debounce = require('debounce');

module.exports = Boot;

function Boot() {

  var header = document.createElement('h1');
  header.innerHTML = 'This text is injected by code.<br/>Nice to see instant feedbacks.';
  document.body.appendChild(header);

}
