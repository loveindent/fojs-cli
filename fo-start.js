var program = require('commander');

var startApp = require('./lib/start-app');

program
  .command('app')
  .description('start app')
  .action(function() {
    console.log('Boostraping app is started');
    startApp()
  })
;

program.parse(process.argv);
