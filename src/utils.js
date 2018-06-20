require('dotenv').config()

const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

function verifyPass(password, hash) {
  return bcrypt.compareSync(password, hash)
}

function signJwt(user) {
  return jsonwebtoken.sign({
    // Basics
    id: user.id,
    email: user.email,

    // Region
    cc: user.cc,
    zip: user.zip,

    // Pivots
    gender: user.gender,
    relationship: user.relationship,
    siblings: user.siblings,
    children: user.children,
    religion: user.religion,
    ethnicity: user.ethnicity,
    job: user.job,
  }, process.env.JWT_SECRET)
}

exports.verifyPass = verifyPass
exports.signJwt = signJwt
