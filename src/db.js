require('dotenv').config()

const bcrypt = require('bcryptjs')
const knex = require('knex')
const randomstring = require('randomstring')

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const db = knex(config)

function errorLogger(error) {
  console.error(error)
  throw error
}

function parseIntDB(intStr) {
  return intStr ? parseInt(intStr) : null
}

// Preferences

function _savePreferenceP(user_id, alpha_id, beta_id, win_bit) {
  return db('preferences')
    .insert({
      user_id: user_id,
      alpha_id: alpha_id,
      beta_id: beta_id,
      win_bit: win_bit,
    })
    .returning('id')
}

function updatePreferenceP(user_id, alpha_id, beta_id, win_bit) {
  return db('preferences')
    .where({
      user_id: user_id,
      alpha_id: alpha_id,
      beta_id: beta_id,
    })
    .update({ win_bit: win_bit })
    .returning('id')
    .then(res => res[0])
    .catch(errorLogger)
}

function saveOrUpdatePreferenceP(user_id, winner_id, loser_id) {
  const [alpha_id, beta_id] = [winner_id, loser_id].sort()
  const win_bit = (alpha_id == winner_id) ? 0 : 1
  return _savePreferenceP(user_id, alpha_id, beta_id, win_bit)
    .catch(error => updatePreferenceP(user_id, alpha_id, beta_id, win_bit))
}

function getPreferencesP() {
  return db
    .select('user_id', 'alpha_id', 'beta_id', 'win_bit', 'cc', 'zip')
    .from('preferences')
    .join('users', 'preferences.user_id', 'users.id')
    .catch(errorLogger)
}

// Users and Registration Codes
function saveUserP(user) {
  let saltRounds = parseInt(process.env.SALT_ROUNDS)
  user.password = bcrypt.hashSync(user.password, saltRounds)
  return db('users')
    .insert(user)
    .returning('*')
    .then(res => res[0])
    .catch(errorLogger)
}

function updateUserP(id, user) {
  return db('users')
    .where({ id: id })
    .update(user)
    .returning('*')
    .then(res => res[0])
    .catch(errorLogger)
}

function getUserByIdP(id) {
  return db('users')
    .select('*')
    .where({ id: id })
    .first()
    .catch(errorLogger)
}

function getUserByEmailP(email) {
  return db('users')
    .select('*')
    .where({ email: email })
    .first()
    .catch(errorLogger)
}

function createRegistrationP(parentId = null) {
  let registration = {
    register_code: randomstring.generate(),
    confirm_code: randomstring.generate(),
    parent_id: parentId,
  }
  return db('registrations')
    .insert(registration)
    .returning('*')
    .then(res => res[0])
    .catch(errorLogger)
}

function validateRegisterCodeP(regCode) {
  return db('registrations')
    .select('id')
    .where({ register_code: regCode })
    .first()
    .then(res => res.id)
    .catch(errorLogger)
}

function linkRegistrationToUserP(regId, userId) {
  return db('registrations')
    .where({ id: regId })
    .update({ user_id: userId })
    .returning(['confirm_code', 'user_id'])
    .then(res => res[0])
    .catch(errorLogger)
}

function getUserIdByConfirmCode(confCode) {
  return db('registrations')
    .select('user_id')
    .where({ confirm_code: confCode })
    .first()
    .then(res => res.user_id)
    .catch(errorLogger)
}

function confirmUserP(id) {
  return db('users')
    .where({ id: id })
    .update({ confirmed: true })
    .returning('*')
    .then(res => res[0])
    .catch(errorLogger)
}

function registerUserP(regCode, userObj) {
  return validateRegisterCodeP(regCode)
    .then(regId =>
      saveUserP(userObj)
        .then(user =>
          linkRegistrationToUserP(regId, user.id)
        )
    )
}

function confirmUserFromCodeP(confCode) {
  return getUserIdByConfirmCode(confCode)
    .then(userId =>
      confirmUserP(userId)
    )
}

exports.migrate = db.migrate
exports.parseIntDB = parseIntDB

exports.saveOrUpdatePreferenceP = saveOrUpdatePreferenceP
exports.getPreferencesP = getPreferencesP

exports.saveUserP = saveUserP
exports.updateUserP = updateUserP
exports.getUserByIdP = getUserByIdP
exports.getUserByEmailP = getUserByEmailP

exports.createRegistrationP = createRegistrationP
exports.registerUserP = registerUserP
exports.confirmUserFromCodeP = confirmUserFromCodeP
