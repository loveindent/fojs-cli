var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var H = require('handlebars');

module.exports = function(componentName) {
  var packageFile = path.join(process.cwd(), 'package.json')
  var destinationDir = process.cwd()
  var templateDir = path.join(fs.realpathSync(__dirname), '../templates/app')

  fs.stat(packageFile, function (err) {
    if (err) return console.error('Doh! Start NPM before. You should have a package.json file.')
    fs.copy(templateDir, destinationDir, function(err) {
      if (err) console.error(err)
      console.log('Perfect! Your app is ready');
    })
  })
}
