const fs = require('fs')
const path = require('path')
const sinon = require('sinon')
const listFiles = require('../lib/listFiles')

describe('List Files', () => {
  it('should list all Javascript files', () => {
    sinon.stub(path, 'resolve').returns('/node_modules')

    sinon.stub(fs, 'readdirSync')
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

    sinon.stub(fs, 'lstatSync')
      .withArgs('/node_modules/folder').returns(isDirectory(true))
      .withArgs('/node_modules/jsonFile.json').returns(isDirectory(false))
      .withArgs('/node_modules/javascriptFileOne.js').returns(isDirectory(false))
      .withArgs('/node_modules/javascriptFileTwo.js').returns(isDirectory(false))
      .withArgs('/node_modules/javascriptFileThree.js').returns(isDirectory(false))

    const javascriptFiles = listFiles()

    expect(javascriptFiles.length).to.equal(3)
  })
})
