var program = require('commander');
var _ = require('lodash');

var createComponent = require('./lib/create-component');

program
  .command('component [name]')
  .description('create component')
  .action(function(name) {
    if (_.isEmpty(name)) {
      console.error('you must give a name to your component');
      process.exit(1);
    }

    console.log('You are starting a new component named ' + name);
    createComponent(name)
  })
;

program.parse(process.argv);
