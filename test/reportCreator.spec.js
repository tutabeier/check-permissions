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

    const generatedReport = reportCreator.generate(permissionsPerFile)
    const expectedReport = '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Check Permissions report</title>\n    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">\n  </head>\n  <body>\n    <div class="page-header">\n      <h1>Check Permissions report</h1>\n    </div>\n    <div class="row">\n      <div class="panel panel-default col-sm-4">\n        <div class="panel-heading" style="word-wrap: break-word">httpFile.js</div>\n        <div class="panel-body">\n          HTTP,HTTPS\n        </div>\n      </div>\n      <div class="panel panel-default col-sm-4">\n        <div class="panel-heading" style="word-wrap: break-word">fileSystemFile.js</div>\n        <div class="panel-body">\n          File System\n        </div>\n      </div>\n      <div class="panel panel-default col-sm-4">\n        <div class="panel-heading" style="word-wrap: break-word">netFile.js</div>\n        <div class="panel-body">\n          Net\n        </div>\n      </div>\n      <div class="panel panel-default col-sm-4">\n        <div class="panel-heading" style="word-wrap: break-word">osFile.js</div>\n        <div class="panel-body">\n          OS\n        </div>\n      </div>\n    </div>\n  </body>\n</html>\n'

    expect(generatedReport).to.be.equal(expectedReport)
  })
})
