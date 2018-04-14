var fs = require('fs')
var path = require('path')
var Promise = require('bluebird')
var giab = require('./src/giab')
var CONST = require('./src/const')
var utils = require('./src/util')
var htmlFile = fs.readFileSync(CONST.INDEX_NAME, 'utf8')
var rc = null

try {
  rc = utils.getGiabRC(CONST.RC_NAME)
} catch(e) {
}

var github = giab.init(rc)
var outputFilename = CONST.output ? path.normalize(CONST.output.filename) : CONST.INDEX_NAME

github.issues.repoIssuesAsync(rc.owner, rc.repo).then(function(list) {
  var str = list.map(utils.formatIssueItem).join('\n')
  fs.writeFileSync(outputFilename, utils.replaceREADME(htmlFile, str, CONST.REG))

  console.log(`
    ${list.length} 条博客更新完毕！
  `)
}).catch(function(e){
  console.error(e);
});