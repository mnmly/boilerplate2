var path = require('path');
var package = require('./package.json');

module.exports = {
  out: 'build/build',
  main: path.resolve('.', package.browser),
  style: path.resolve('.', package.style),
  debug: true,
  paths: ["lib"]
};
