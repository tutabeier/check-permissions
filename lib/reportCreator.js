const Mustache = require('mustache')
const fs = require('fs')
const path = require('path')

const templateLocation = path.resolve(__dirname, '..', 'templates')
const template = fs.readFileSync(templateLocation + '/index.html')

const generate = (permissionsPerFile) => {
  return Mustache.render(template.toString(), {'permissions': permissionsPerFile})
}
module.exports.generate = generate
