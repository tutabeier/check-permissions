const fs = require('fs')

const permissionLabels = {
  http: 'HTTP',
  https: 'HTTPS',
  fs: 'File System',
  net: 'Net',
  os: 'OS'
}

const checkForPermission = (content, permission) => {
  const regex = `require\\([\"\']${permission}[\"\']\\)`
  return content.toString().match(regex)
}

const searchForPermissions = (filePath) => {
  const fileContent = fs.readFileSync(filePath)
  let permissions = []

  for (permission in permissionLabels) {
    if (checkForPermission(fileContent, permission)) {
      permissions.push(permissions[permission])
    }
  }

  if (permissions.length > 0) {
    return {
      filePath,
      permissions
    }
  }
}

const get = (files) => {
  return files
    .map(searchForPermissions)
    .filter(element => element != undefined)
}

module.exports.get = get
