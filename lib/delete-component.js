var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var H = require('handlebars');
var dirToDelete

module.exports = function(componentName) {
  componentName = _.capitalize(componentName);
  var destComponentsIndex = path.join(process.cwd(), '/src/commons/components/index.js');
  var targetDir = path.join(process.cwd(), '/src/commons/components/' + componentName);

  fs.exists(targetDir, function (exists) {
    if (!exists) return console.error('Component no exists')

    fs.emptyDir(targetDir, function (err) {
      if (err) console.error(err)

      fs.rmdir(targetDir, function(err) {
        console.log('Component successfully delete')

        fs.readFile(destComponentsIndex, 'utf8', function(err, index) {
          var line = 'export '+componentName+' from \'./'+componentName+'\''
          var result = index.replace(line, '');

            fs.writeFile(destComponentsIndex, result, 'utf8', function (err) {
               if (err) return console.log(err);
               console.log('Component successfully unlinked')
            });
        })

      })
    })
  })
}
