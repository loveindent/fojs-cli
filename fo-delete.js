var program = require('commander');
var _ = require('lodash');

var deleteComponent = require('./lib/delete-component');

program
  .command('component [name]')
  .description('delete component')
  .action(function(name) {
    if (_.isEmpty(name)) {
      console.error('Name of the component is required');
      process.exit(1);
    }

    console.log('You are starting to delete component named ' + name);
    deleteComponent(name)
  })
;

program.parse(process.argv);
