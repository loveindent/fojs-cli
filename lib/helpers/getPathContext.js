var path = require('path')
var pluralize = require('pluralize')
var C = require('../constant')
var conf = require('../config')

module.exports = function(ressourceType, into) {
  var basePath = conf.rootPath

  if (into) {
    if (/app/.test(into)) {
      basePath = path.join(basePath, into, pluralize.plural(ressourceType))
    }
    else {
      basePath = path.join(basePath, pluralize.plural(ressourceType), into)
    }
  }
  else {
    switch(ressourceType) {
      case C.RESSOURCE_TYPES.COMPONENT:
        basePath = path.join(basePath, pluralize.plural(ressourceType))
        break;
    }
  }

  return basePath
}
