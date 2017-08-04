const fs = require('fs')
const permissionsPerFile = require('../lib/permissionsPerFile')
const sinon = require('sinon')
const httpContent = `
  require("http")
  require('https')`
const fileSystemContent = `require('fs')`
const netContent = `require("net")`
const osContent = `require('os')`

describe('Permission per file', () => {
  let sandbox
  before(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(fs, 'readFileSync')
      .withArgs('httpFile.js').returns(httpContent)
      .withArgs('fileSystemFile.js').returns(fileSystemContent)
      .withArgs('netFile.js').returns(netContent)
      .withArgs('osFile.js').returns(osContent)
  })

  after(() => {
    sandbox.restore()
  })

  it('should return a list of files and their permissions', () => {
    const listOfFiles = [
      'httpFile.js',
      'fileSystemFile.js',
      'netFile.js',
      'osFile.js'
    ]


    const actualValue = permissionsPerFile.get(listOfFiles)

    const expectedValue = [{
      filePath: 'httpFile.js',
      permissions: ['HTTP', 'HTTPS']
    }, {
      filePath: 'fileSystemFile.js',
      permissions: ['File System']
    }, {
      filePath: 'netFile.js',
      permissions: ['Net']
    }, {
      filePath: 'osFile.js',
      permissions: ['OS']
    }]

    expect(actualValue).to.be.eql(expectedValue)
  })
})