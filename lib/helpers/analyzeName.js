var _ = require('lodash')

module.exports = function(componentName) {
  var result = {}

  if (componentName.indexOf('/') !== -1) {
    var name = componentName.substring(componentName.lastIndexOf('/') + 1)
    result.name = _.capitalize(name)
    result.path = componentName.replace(name, '')
  }
  else {
    result.name = _.capitalize(componentName)
  }

  return result
}
