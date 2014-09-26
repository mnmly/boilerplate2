#!/usr/bin/env node

var program = require('commander');
var resolve = require('path').resolve;

function list(val) {
  if (val) return val.split(',').map(function(v) { return v.trim(); });
  return [];
}

program
  .option('-p, --port <port>', 'specify the port [3000]', 3000)
  .option('-x, --proxy <proxy>', 'specify the port [null]', null)
  .option('-e, --entry <entry>', 'An entry point of app')
  .option('-s, --style-entry <entry>', 'An entry point of style')
  .option('-d, --dev <dev>', 'specify the port [true]', true)
  .option('-o, --out <dir>', 'output directory [build]', 'build')
  .option('-n, --name <name>', 'name of output file [build]', 'build')
  .option('-r, --requires <module>', 'name of module [boot]', 'boot')
  .option('-b, --base-dir <basedir>', 'base directory where pakage.json lives')
  .option('--paths <paths>', 'paths for modules', list)
  .option('--files <files>', 'additional files to look out for', list)
  .option('--no-require', 'name of module [false]', false)
  .option('-u, --unexposed', 'name of module')
  .parse(process.argv);

var baseDir = program.baseDir ? program.baseDir : process.cwd();
var package = require(resolve(baseDir, 'package.json'));

var buildConfig = {
  debug: program.dev,
  out: program.out,
  name: program.name,
  entry: program.entry || package.main,
  style: program.styleEntry,
  requires: program.requires,
  paths: program.paths && program.paths.map(function(v) { return resolve(baseDir, v );} ),
  baseDir: baseDir
};

if (program.unexposed) {
  delete buildConfig.requires;
}


var param = {
  port: program.port,
  logLevel: 'silent',
  open: false,
  files: program.files
};

if (program.proxy) {
  param.proxy = program.proxy;
} else {
  param.server = { baseDir: process.cwd() };
}

console.log(buildConfig);

module.exports = { config: buildConfig, param: param };
