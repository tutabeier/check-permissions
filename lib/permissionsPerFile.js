const fs = require('fs')

const checkForPermission = (content, permission) => {
  const regex = `require\\([\"\']${permission}[\"\']\\)`
  const matcher = new RegExp(regex, 'g')
  return content.toString().match(regex)
}

const searchForPermissions = (filePath) => {
  const fileContent = fs.readFileSync(filePath)
  let permissions = []

  if (checkForPermission(fileContent, 'http')) {
    permissions.push('HTTP')
  }

  if (checkForPermission(fileContent, 'https')) {
    permissions.push('HTTPS')
  }

  if (checkForPermission(fileContent, 'fs')) {
    permissions.push('File System')
  }

  if (checkForPermission(fileContent, 'net')) {
    permissions.push('Net')
  }

  if (checkForPermission(fileContent, 'os')) {
    permissions.push('OS')
  }

  if (permissions.length > 0) {
    return {
      filePath,
      permissions
    }
  }
}

module.exports = (files) => {
  return files
    .map(searchForPermissions)
    .filter(element => element != undefined)
}
