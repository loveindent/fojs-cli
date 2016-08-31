var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var H = require('handlebars');

module.exports = function(setting, value) {

  var configFile =  path.join(process.cwd(), '.foconfigrc');

  fs.stat(configFile, function (err) {
    return console.error('Doh! Create .foconfigrc before !')

    var configData = JSON.parse(fs.readFileSync(configFile).toString())
    if (typeof configData[setting] != 'undefined') {
      configData[setting] = value
      fs.writeFile(configFile, JSON.stringify(configData, null, '\t'))
      console.log('Setting successfully saved')
    }
    else {
      console.error('Doh! Setting no exists')
    }
  })
}
