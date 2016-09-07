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

/* eslint no-console: off */
module.exports = function(componentPath) {
  var ressource = C.RESSOURCE_TYPES.COMPONENT
  var analyzedComponentPath = analyzeName(componentPath)
  var componentName = analyzedComponentPath.name
  var pathContext = getPathContext(ressource, analyzedComponentPath.path)

  var destComponentsIndex = getIndex(pathContext, ressource)
  var templateDir = getTemplateDir(ressource)
  var targetDir = getTargetDir(pathContext, componentName)

  fs.exists(targetDir, function(exists) {
    if (exists) return console.error('allready exsit')

    fs.walk(templateDir)
      .on('data', function(item) {
        var itemPath = path.parse(item.path.replace('__name__', componentName))

        if (!_.isEmpty(itemPath.ext)) {
          if (itemPath.name === 'link') {
            fs.readFile(destComponentsIndex, 'utf8', function(err, index) {
              var indexContent = index || ''
              var linkFile = path.join(templateDir, itemPath.base)

              fs.readFile(linkFile, function(err, linkContent) {
                if (err) return console.error(err)

                var template = H.compile(linkContent + '')
                var p = './' + path.join(path.join(process.cwd(), pathContext).replace(destComponentsIndex.replace('/index.js', ''), ''), componentName)

                fs.outputFile(destComponentsIndex, indexContent + template({path: p, name: componentName}), function(err) {
                  if (err) return console.error(err)
                  console.log('Successfully linked: ', destComponentsIndex)
                });
              })
            })
          }
          else {
            fs.readFile(item.path, 'utf8', function(err, content) {
              if (err) return console.error(err);

              var fileToPrint = path.join(targetDir, itemPath.base);
              var template = H.compile(content);

              fs.outputFile(fileToPrint, template({name: componentName}), function(err) {
                if (err) return console.error(err)
                console.log('Successfully created: ', fileToPrint)
              });
            })
          }
        }
      })
    ;
  })
}
