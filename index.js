#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1')
  .command('create [ressource]', 'create something')
  .command('delete [ressource]', 'delete something')
;

program.parse(process.argv);
