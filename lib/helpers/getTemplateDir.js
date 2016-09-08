var path = require('path')
var Joi = require('joi')

module.exports = function(ressource) {
  var validation = Joi.validate(ressource, Joi.string().allow('app', 'component'))

  if (validation.error) {
    throw new Error('Invalid ressource')
  }

  return path.join(__dirname, '../../templates/' + ressource)
}
