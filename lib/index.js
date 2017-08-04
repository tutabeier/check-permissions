#!/usr/bin/env node
const Mustache = require('mustache')
const listFiles = require('./listFiles')
const permissionsPerFile = require('./permissionsPerFile')
const reportCreator = require('./reportCreator')

const javascriptFiles = listFiles()
const permissions = permissionsPerFile(javascriptFiles)
const output = reportCreator(permissions)
console.log(output)
