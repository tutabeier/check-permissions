const fs = require('fs')
const path = require('path')
const sinon = require('sinon')
const listFiles = require('../lib/listFiles')

describe('List Files', () => {
  let sandbox
  before(() => {
    sandbox = sinon.sandbox.create();

    resolveStub = sandbox.stub(path, 'resolve').returns('/node_modules')

    sandbox.stub(fs, 'readdirSync')
      .withArgs('/node_modules').returns([
        'folder',
        'jsonFile.json',
        'javascriptFileOne.js',
        'javascriptFileTwo.js',
        'javascriptFileThree.js'
      ])
      .withArgs('/node_modules/folder').returns([])

    const isDirectory = (is) => {
      return {
        isDirectory: () => is
      }
    }

    sandbox.stub(fs, 'lstatSync')
      .withArgs('/node_modules/folder').returns(isDirectory(true))
      .withArgs('/node_modules/jsonFile.json').returns(isDirectory(false))
      .withArgs('/node_modules/javascriptFileOne.js').returns(isDirectory(false))
      .withArgs('/node_modules/javascriptFileTwo.js').returns(isDirectory(false))
      .withArgs('/node_modules/javascriptFileThree.js').returns(isDirectory(false))
  })

  after(() => {
    sandbox.restore()
  })

  it('should list all Javascript files', () => {
    const javascriptFiles = listFiles.list()

    expect(javascriptFiles.length).to.equal(3)
  })
})
