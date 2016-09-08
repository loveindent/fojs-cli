var fs = require('fs-extra')
var path = require('path')
var _ = require('lodash')
var H = require('handlebars')
var getTemplateDir = require('./helpers/getTemplateDir')

/*eslint no-console: off */
module.exports = function(appName) {
  var appDir = process.cwd()
  var templateDir = getTemplateDir('app')
  var Hignore = ['.eot', '.svg', '.ttf', '.woff']
  var fileToIgnore = ['.DS_Store']

  fs.exists(path.join(appDir, 'package.json'), function(exists) {
    if (exists) return console.error('Doh! Your app allready exist. Please remove your files and package.json before.')
    console.log('Start to create ' + appName + ' application')
    fs.walk(templateDir)
      .on('data', function(item) {
        var savePath = item.path.replace(templateDir, '')
        var itemPath = path.parse(item.path)

        if (/^__/.test(itemPath.base) || /^\.__/.test(itemPath.base)) {
          savePath = savePath.replace('__', '')
        }

        if (item.stats.isFile() && !_.includes(fileToIgnore, itemPath.base)) {
          fs.readFile(item.path, 'utf8', function(err, content) {
            if (err) console.error(err)

            var fileToPrint = path.join(appDir, savePath)
            var template = H.compile(content);

            if (_.includes(Hignore, itemPath.ext)) {
              fs.copy(item.path, fileToPrint, function(err) {
                if (err) console.error(err)
              })
            }
            else {
              fs.outputFile(fileToPrint, template({name: appName}), function(err) {
                if (err) return console.error(err)
              });
            }
          })
        }
      })
      .on('end', function () {
        console.log('Ok! Your app is build! Run NPM install now and go!')
      })
    ;
  })
}
