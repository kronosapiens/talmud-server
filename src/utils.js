const bcrypt = require('bcrypt')

function textToJson(text) {
  return JSON.stringify({ text: text })
}

function verifyPass(password, hash) {
  console.log([password, hash])
  return bcrypt.compareSync(password, hash)
}

exports.textToJson = textToJson
exports.verifyPass = verifyPass
