var program = require('commander');
var _ = require('lodash');

var editConfig = require('./lib/edit-config');

program
  .command('edit [setting] [value]')
  .description('edit config')
  .action(function(setting, value) {
    if (_.isEmpty(setting)) {
      console.error('Doh! You must choose a setting to adjust');
      process.exit(1);
    }
    else if (_.isEmpty(value)) {
      console.error('Doh! You must give a value');
      process.exit(1);
    }

    editConfig(setting, value)
  })
;

program.parse(process.argv);
