var path = require('path')
var CWD = process.cwd()
var START_TAG = '<!--issue_list_start-->'
var END_TAG = '<!--issue_list_end-->'

module.exports = {
  RC_NAME: path.normalize(CWD + '/config.json'),
  INDEX_NAME: path.normalize(CWD + '/index.html'),
  START_TAG: START_TAG,
  END_TAG: END_TAG,
  CWD: CWD,
  REG: new RegExp(`${START_TAG}(\n|.)+${END_TAG}`),
  // flag用于评级文章参与度
  FIRE_LAG: ':fire:',
  HEART_FLAG: ':heart:',
  MAX_FIRE_SIZE: 5,
  MIN_HEART_SIZE: 100
}
