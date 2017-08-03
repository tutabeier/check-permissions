#!/usr/bin/env node
const Mustache = require('mustache')

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
    return {
      filePath,
      permissions
    }
  }
}

const nodeModulesFolder = path.resolve(__dirname, '..', '..')
findFromDir(nodeModulesFolder)
const permissions = javascriptFiles
  .map(searchForPermissions)
  .filter(element => element != undefined)
const templateLocation = path.resolve(__dirname, '..', 'templates')
const template = fs.readFileSync(templateLocation + '/index.html')
const output = Mustache.render(template.toString(), {'permissions': permissions} )
console.log(output)
