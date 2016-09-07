var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var H = require('handlebars');
var getTemplateDir = require('./helpers/getTemplateDir')
var getIndex = require('./helpers/getIndex')
var analyzeName = require('./helpers/analyzeName')
var getPathContext = require('./helpers/getPathContext')
var getTargetDir = require('./helpers/getTargetDir')
var C = require('./constant')

module.exports = function(componentPath) {
  var ressource = C.RESSOURCE_TYPES.COMPONENT
  var analyzedComponentPath = analyzeName(componentPath)
  var componentName = analyzedComponentPath.name
  var pathContext = getPathContext(ressource, analyzedComponentPath.path)

  var destComponentsIndex = getIndex(pathContext, ressource)
  var templateDir = getTemplateDir(ressource)
  var targetDir = getTargetDir(pathContext, componentName)

  fs.exists(targetDir, function (exists) {
    if (!exists) return console.error('Component no exists')

    fs.emptyDir(targetDir, function (err) {
      if (err) console.error(err)

      fs.rmdir(targetDir, function(err) {
        console.log('Component successfully delete')

        var linkFile = path.join(templateDir, 'link.js')
        fs.readFile(linkFile, function(err, linkContent) {
          if (err) return console.error(err)

          var template = H.compile(linkContent + '')
          fs.readFile(destComponentsIndex, 'utf8', function(err, index) {
            var p = '.' + path.join(path.join(process.cwd(), pathContext).replace(destComponentsIndex.replace('/index.js', ''), ''), componentName)
            var line = template({path: p, name: componentName})
            var file = index.replace(line, '')
            fs.writeFile(destComponentsIndex, file, 'utf8', function (err) {
              if (err) return console.log(err)
              console.log('Component successfully unlinked')
            });
          })
        })
      })
    })
  })
}
