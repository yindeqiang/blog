var CONST = require('./const')
var fs = require('fs')

function repeat(str, times) {
  var ret = ''
  for(var i = 0; i < times; i += 1) {
    ret += str
  }
  return ret
}

exports.getGiabRC = function getGiabRC(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
}

exports.replaceREADME = function replaceREADME(content, issueListString, reg) {
  var blogList = `${CONST.START_TAG}\n\n${issueListString.trim()}\n\n${CONST.END_TAG}`
  if (!content.match(reg)) {
    return `${content}\n\n${blogList}`
  } else {
    return content.replace(reg, blogList)
  }
}

exports.formatIssueItem = function formatIssueItem(item) {
  var date = new Date(item.created_at).toLocaleDateString()
  var divNum = CONST.MIN_HEART_SIZE / CONST.MAX_FIRE_SIZE
  var flag = item.comments >= CONST.MIN_HEART_SIZE ? CONST.HEART_FLAG :
    repeat(CONST.FIRE_LAG, Math.floor(item.comments / divNum))
  // return `> * [${date} ${flag} ${item.title}](${item.html_url})`
  return `<li>
    <span>[${date}]</span>
    <a href="${item.html_url}" target="_blank">
      ${flag} ${item.title}
    </a>
  </li>`
}