#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

let javascriptFiles = []

const findFromDir = (dir) => {
  const dirContent = fs.readdirSync(dir)
  dirContent.forEach((element) => {
    const filePath = path.join(dir, element)
    const stat = fs.lstatSync(filePath)

    if (stat.isDirectory()) {
      findFromDir(filePath)
    } else if (filePath.endsWith('.js')) {
      javascriptFiles.push(filePath)
    }
  })
}

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
    const returnedObject = {}
    returnedObject[filePath] = permissions
    return returnedObject
  }
}

const nodeModulesFolder = path.resolve(__dirname, '..', '..')
findFromDir(nodeModulesFolder)
const permissions = javascriptFiles
  .map(searchForPermissions)
  .filter(element => element != undefined)
console.log(permissions)
