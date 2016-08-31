var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var H = require('handlebars');

module.exports = function(componentName) {
  componentName = _.capitalize(componentName);
  var destComponentsIndex = path.join(process.cwd(), '/src/commons/components/index.js');
  var templateDir = path.join(fs.realpathSync(__dirname), '../templates/component');
  var targetDir = path.join(process.cwd(), '/src/commons/components/' + componentName);

  fs.exists(targetDir, function (exists) {
    if (!exists) return console.error('Component no exists')

    fs.emptyDir(targetDir, function (err) {
      if (err) console.error(err)

      fs.rmdir(targetDir, function(err) {
        console.log('Component successfully delete')

        var linkFile = path.join(templateDir, 'link.js');
        fs.readFile(linkFile, function(err, linkContent) {
          if (err) return console.error(err)

          var template = H.compile(linkContent + '');
          fs.readFile(destComponentsIndex, 'utf8', function(err, index) {
            var line = template({name: componentName})
            var file = index.replace(line, '')
            fs.writeFile(destComponentsIndex, file, 'utf8', function (err) {
              if (err) return console.log(err);
              console.log('Component successfully unlinked')
            });
          })
        })
      })
    })
  })
}
