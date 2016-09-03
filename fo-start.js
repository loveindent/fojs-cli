var program = require('commander')
var _ = require('lodash')
var startApp = require('./lib/start-app')

program
  .command('app [name]')
  .description('start app')
  .action(function(name) {
    if (_.isEmpty(name)) {
      console.error('Doh! You must give a name to your application');
      process.exit(1);
    }
    console.log('Boostraping application is started');
    startApp(name)
  })

program.parse(process.argv)
