#!/usr/bin/env node
const listFiles = require('./listFiles')
const permissionsPerFile = require('./permissionsPerFile')
const reportCreator = require('./reportCreator')

const javascriptFiles = listFiles.list()
const permissions = permissionsPerFile.get(javascriptFiles)
reportCreator.generate(permissions)
