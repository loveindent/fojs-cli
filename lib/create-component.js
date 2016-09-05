var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var H = require('handlebars');

/*eslint no-console: off */
module.exports = function(componentPath) {
  var componentName = componentPath

  if (componentPath.indexOf('/') !== -1) {
    componentName = componentPath.substring(componentPath.lastIndexOf('/') + 1)
    componentPath = componentPath.replace(componentName, _.capitalize(componentName))
  }

  componentName = _.capitalize(componentName);
  var destComponentsIndex = path.join(process.cwd(), '/src/commons/components/index.js');
  var templateDir = path.join(fs.realpathSync(__dirname), '../templates/component');
  var targetDir = path.join(process.cwd(), '/src/commons/components/' + componentPath);

  fs.exists(targetDir, function(exists) {
    if (exists) return console.error('allready exsit')

    fs.walk(templateDir)
      .on('data', function(item) {
        var itemPath = path.parse(item.path.replace('__name__', componentName))

        if (!_.isEmpty(itemPath.ext)) {
          if (itemPath.name === 'link') {
            fs.readFile(destComponentsIndex, 'utf8', function(err, index) {
              if (err) return console.error(err);

              var linkFile = path.join(templateDir, itemPath.base)

              fs.readFile(linkFile, function(err, linkContent) {
                if (err) return console.error(err)

                var template = H.compile(linkContent + '')

                fs.outputFile(destComponentsIndex, index + template({path: _.trimStart(componentPath, '/'), name: componentName}), function(err) {
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
