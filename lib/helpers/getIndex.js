var path = require('path')
var pluralize = require('pluralize')

module.exports = function(pathToGet, ressource) {
  var pluralRessource = pluralize.plural(ressource);
  var characterIndex = pathToGet.lastIndexOf(pluralRessource) + pluralRessource.length + 1
  var closestIndex = pathToGet.substring(0, characterIndex)

  return path.join(process.cwd(), closestIndex, 'index.js')
}
