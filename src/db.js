const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: 'postgresql://krono@localhost:5432/krono'
})

function errorLogger(error) {
  console.error(error)
}

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

function seedIdentities() {
  saveIdentityP('Human')
  saveIdentityP('Man')
  saveIdentityP('Woman')
  saveIdentityP('Progressive')
  saveIdentityP('Conservative')
  saveIdentityP('Lover')
  saveIdentityP('Fighter')
  saveIdentityP('Jew')
  saveIdentityP('Christian')
  saveIdentityP('Buddhist')
  saveIdentityP('Muslim')
  saveIdentityP('Hindu')
}

exports.saveIdentityP = saveIdentityP
exports.getIdentitiesP = getIdentitiesP
exports.savePreferenceP = savePreferenceP
exports.getPreferencesP = getPreferencesP
exports.seedIdentities = seedIdentities
