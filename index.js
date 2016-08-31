#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1')
  .command('start', 'Start a new app')
  .command('create [ressource]', 'create something')
  .command('delete [ressource]', 'delete something')
  .command('config [setting] [value]', 'edit config')
;

program.parse(process.argv);
