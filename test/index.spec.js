const listFiles = require('../lib/listFiles')
const permissionsPerFile = require('../lib/permissionsPerFile')
const reportCreator = require('../lib/reportCreator')
const sinon = require('sinon')

describe('Index', () => {
  let sandbox
  before(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(listFiles, 'list')
      .withArgs().returns([
        'httpFile.js',
        'fileSystemFile.js',
        'netFile.js',
        'osFile.js'
      ])

    sandbox.stub(permissionsPerFile, 'get')
      .withArgs().returns([{
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
      }])
  })

  after(() => {
    sandbox.restore()
  })

  it('should generate report', () => {
    const logSpy = sandbox.spy(console, 'log')

    const index = require('../lib/index')

    expect(logSpy.called).to.be.true
  })
})
