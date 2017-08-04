const fs = require('fs')
const path = require('path')

let javascriptFiles = []

const listJavascriptFilesInDirectory = (dir) => {
  const dirContent = fs.readdirSync(dir)
  dirContent.forEach((element) => {
    const filePath = path.join(dir, element)
    const stat = fs.lstatSync(filePath)

    if (stat.isDirectory()) {
      listJavascriptFilesInDirectory(filePath)
    } else if (filePath.endsWith('.js')) {
      javascriptFiles.push(filePath)
    }
  })
}

const list = () => {
  const nodeModulesFolder = path.resolve(__dirname, '..', '..')
  listJavascriptFilesInDirectory(nodeModulesFolder)
  return javascriptFiles
}

module.exports.list = list
