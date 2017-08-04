const reportCreator = require('../lib/reportCreator')

describe('Report creator', () => {
  it('should generate report', () => {
    const permissionsPerFile = [{
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

    const generatedReport = reportCreator(permissionsPerFile)
    const expectedReport = '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Check Permissions report</title>\n  </head>\n  <body>\n    <ul>\n      <li>httpFile.js : HTTP,HTTPS</li>\n      <li>fileSystemFile.js : File System</li>\n      <li>netFile.js : Net</li>\n      <li>osFile.js : OS</li>\n    </ul>\n  </body>\n</html>\n'

    expect(generatedReport).to.be.equal(expectedReport)
  })
})
