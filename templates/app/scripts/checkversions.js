/* eslint-disable no-console */
var chalk = require('chalk')
var semver = require('semver')
var version = process.version.replace('v', '')
var pk = require('../package.json')

var satisfy = semver.satisfies(version, pk.engines.node)

if (process.env.NODE_ENV !== 'production') {
  if (satisfy) {
    console.info(chalk.green('\u2713 Your node version is ok\n\n'))
  }
  else {
    console.error(chalk.red('\u2716 Your node version is not ok\n\n'))
  }

  return satisfy
}
else {
  return true
}
