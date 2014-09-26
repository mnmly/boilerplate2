/**
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 3000;
var build = require('boilerplate-build');
var Preview = require('instant-preview-server');
var debounce = require('debounce');
var browserSync = require('browser-sync');
var notifyTimeout = 5000;

module.exports = run;

function run(param, _config) {

  var config = _config;

  if (config.out.lastIndexOf('/') !== config.out.length) {
    config.out += '/';
  }

  browserSync(param, function() {

    console.log('Running on port ' + param.port);

    var preview = new Preview();
    preview.listen();
    preview.on('preview', debounce(onpreview, 200));

    function onpreview(o) {

      if (!/\.(js|css|html)/.test(o.filename)) return;

      config.preview = o;

      if (/\.js$/.test(o.filename)) {
        build.script(config, function(e) {
          if (e) {
            browserSync.notify(parse(e.message, 'js'), notifyTimeout);
          } else {
            browserSync.reload([config.out + config.name + '.js']);
          }
        });
      } else if (/\.css$/.test(o.filename)){

        if (!config.style) return;

        build.style(config, function(e) {
          if (e) {
            browserSync.notify(parse(e.message, 'css'), notifyTimeout);
          } else {
            browserSync.reload([config.out + config.name + '.css']);
          }
        });
      } else {
        browserSync.reload();
      }
    }

    function parse(message, type) {
      return type + '-' + message.replace(__dirname, '');
    }
  });
}

if (!module.parent) {
  var param = {
    server: { baseDir: "./" },
    port: port,
    open: false,
    logLevel: 'silent'
  };
  run(param);
}
