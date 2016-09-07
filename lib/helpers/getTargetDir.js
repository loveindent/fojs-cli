var path = require('path')

module.exports = function(pathContext, ressourceName) {
  return path.join(process.cwd(), pathContext, ressourceName)
}
