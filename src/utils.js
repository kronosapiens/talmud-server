const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

function verifyPass(password, hash) {
  console.log([password, hash])
  return bcrypt.compareSync(password, hash)
}

function signJwt(email, id) {
  return jsonwebtoken.sign({ id: id, email: email }, process.env.JWT_SECRET)
}

exports.verifyPass = verifyPass
exports.signJwt = signJwt
