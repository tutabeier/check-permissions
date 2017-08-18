const Mustache = require('mustache')
const fs = require('fs')
const path = require('path')

const templateLocation = path.resolve(__dirname, '..', 'templates')
const template = fs.readFileSync(templateLocation + '/index.html')

const generate = (permissionsPerFile) => {
  const content = Mustache.render(template.toString(), {'permissions': permissionsPerFile})
  const reportFolder = path.resolve(__dirname, '..') + '/reports'

  if (!fs.existsSync(reportFolder)){
    fs.mkdirSync(reportFolder)
  }

  fs.writeFile(reportFolder + '/index.html', content, (err) => {
    if (err) throw err

    console.info(`Report created at ${reportFolder}/index.html`)
  })
}

module.exports.generate = generate
