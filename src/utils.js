const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secrets = require('../secrets')

function verifyPass(password, hash) {
  console.log([password, hash])
  return bcrypt.compareSync(password, hash)
}

function signJwt(email, id) {
  return jwt.sign({ id: id, email: email }, secrets.jwtSecret)
}

exports.verifyPass = verifyPass
exports.signJwt = signJwt
