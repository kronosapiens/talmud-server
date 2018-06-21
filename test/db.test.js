const assert = require('assert')

process.env.NODE_ENV = 'test'
const db = require('../src/db')

describe('db.js', function() {

  const fakeUser = {
    email: 'test@gmail.com',
    password: 'test',
    cc: 'US',
  }

  beforeEach(function(cb) {
    db.migrate.rollback()
    .then(function() {
      db.migrate.latest()
      .then(function() {
          cb()
      })
    })
  })

  afterEach(function(cb) {
    db.migrate.rollback()
    .then(function() {
      cb()
    })
  })

  describe('saveUserP()', function() {
    it('should create a user', async function() {
      let user = await db.saveUserP(fakeUser)
      assert.equal(user.id, 1)
    })
  })

  describe('createRegistrationP()', function() {
    it('should create a new registration', async function() {
      let reg = await db.createRegistrationP()
      assert.equal(reg.register_code.length, 32)
      assert.equal(reg.confirm_code.length, 32)
      assert.equal(reg.parent_id, null)
      assert.equal(reg.user_id, null)
    })
  })

  describe('registerUserP()', function() {
    it('should register a user', async function() {
      let reg = await db.createRegistrationP()
      let reg2 = await db.registerUserP(reg.register_code, fakeUser)
      assert.equal(reg.confirm_code, reg2.confirm_code)
      assert.equal(reg2.user_id, 1)
    })
  })

  describe('confirmUserFromCodeP()', function() {
    it('should confirm a user', async function() {
      let reg = await db.createRegistrationP()
      let reg2 = await db.registerUserP(reg.register_code, fakeUser)
      let user = await db.confirmUserFromCodeP(reg.confirm_code)
      assert(user.confirmed)
    })
  })

  describe('saveOrUpdatePreferenceP()', function() {
    it('should save a new preference', async function() {
      let user = await db.saveUserP(fakeUser)
      let preferenceId = await db.saveOrUpdatePreferenceP(user.id, 1, 2)
      assert.equal(preferenceId, 1)
    })

    it('should update an existing preference', async function() {
      let user = await db.saveUserP(fakeUser)
      let preferenceId = await db.saveOrUpdatePreferenceP(user.id, 1, 2)
      let preferenceId2 = await db.saveOrUpdatePreferenceP(user.id, 2, 1)
      assert.equal(preferenceId, preferenceId2)
    })
  })

})
