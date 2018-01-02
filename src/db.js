const knex = require('knex')
const bcrypt = require('bcrypt')

const secrets = require('../secrets')

const db = knex({
  client: 'pg',
  connection: 'postgresql://krono@localhost:5432/krono'
})

function errorLogger(error) {
  console.error(error)
}

// Identities and Preferences

function saveIdentityP(name) {
  return db('identities')
    .insert({'name': name})
    .returning('id')
    .catch(errorLogger)
    .then(function(id) {
      console.log('Identity id:', id)
    })
}

function getIdentitiesP() {
  return db
    .select('*')
    .from('identities')
    .catch(errorLogger)
}

function savePreferenceP(winner_id, loser_id) {
  const [a_id, b_id] = [winner_id, loser_id].sort()
  const winner = (a_id == winner_id) ? 0 : 1
  return db('preferences')
    .insert({'a_id': a_id, 'b_id': b_id, 'winner': winner})
    .returning('id')
    .catch(errorLogger)
}

function getPreferencesP() {
  return db
    .select('a_id', 'b_id', 'winner')
    .from('preferences')
    .catch(errorLogger)
}

// Users and Registration Codes
function saveUserP(user) {
  console.log(user)
  console.log(secrets.saltRounds)
  user.password = bcrypt.hashSync(user.password, secrets.saltRounds)
  return db('users')
    .insert(user)
    .returning('id')
    .catch(errorLogger)
}

function getUserByIdP(id) {
  return db
    .select('*')
    .from('users')
    .where({ id: id })
    .first()
}

function getUserByEmailP(email) {
  return db
    .select('*')
    .from('users')
    .where({ email: email })
    .first()
}

exports.saveIdentityP = saveIdentityP
exports.getIdentitiesP = getIdentitiesP

exports.savePreferenceP = savePreferenceP
exports.getPreferencesP = getPreferencesP

exports.saveUserP = saveUserP
exports.getUserByIdP = getUserByIdP
exports.getUserByEmailP = getUserByEmailP
