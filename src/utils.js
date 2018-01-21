const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

function verifyPass(password, hash) {
  console.log([password, hash])
  return bcrypt.compareSync(password, hash)
}

function signJwt(user) {
  return jsonwebtoken.sign({
    // Basics
    id: user.id,
    email: user.email,

    // Pivots
    gender: user.gender,
    religion: user.religion,
    ethnicity: user.ethnicity,
    job: user.job,
  }, process.env.JWT_SECRET)
}

exports.verifyPass = verifyPass
exports.signJwt = signJwt
