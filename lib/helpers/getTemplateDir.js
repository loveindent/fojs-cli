var path = require('path')
var Joi = require('joi')
var config = require('../config')

module.exports = function(ressource) {
  var validation = Joi.validate(ressource, Joi.string().allow('app', 'component'))

  if (validation.error) {
    throw new Error('Invalid ressource')
  }

  if (config.template === 'fo-template-default') {
    return path.join(__dirname, '../../node_modules', config.template, ressource)
  }
  else {
    return path.join(process.cwd(), 'node_modules', config.template, ressource)
  }
}
