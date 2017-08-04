#!/usr/bin/env node
const listFiles = require('./listFiles')
const permissionsPerFile = require('./permissionsPerFile')
const reportCreator = require('./reportCreator')

const javascriptFiles = listFiles.list()
const permissions = permissionsPerFile.get(javascriptFiles)
const output = reportCreator.generate(permissions)
console.log(output)
