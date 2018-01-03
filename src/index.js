const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportJwt = require('passport-jwt')

const db = require('./db')
const utils = require('./utils')
const secrets = require('../secrets')

// Instantiate application
const app = express()
app.use(helmet())
app.use(express.static('src/viz'))
app.use(express.static('assets'))
app.use(bodyParser.json())
app.use(passport.initialize())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

// Passport setup
const passportOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secrets.jwtSecret
}

passport.use(new passportJwt.Strategy(passportOptions, (data, cb) => {
  db.getUserByIdP(data.id)
    .then(user => {
      if (!user) cb(null, false)
      else cb(null, user)
    })
}))

const authJwt = passport.authenticate('jwt', { session: false })

// Define endpoints
app.get('/', (req, res) => {
  console.log('GET /')
  res.send(JSON.stringify({ text: 'Hello World!' }))
})

app.get('/identities', (req, res) => {
  console.log('GET /identities')
  db.getIdentitiesP()
  .then(rows => res.send(rows))
})

app.get('/preferences', (req, res) => {
  console.log('GET /preferences')
  db.getPreferencesP()
    .then(rows => res.send(rows) )
})

app.post('/preferences', authJwt, (req, res) => {
  console.log('POST /preferences')
  db.savePreferenceP(req.user.id, req.body.winner, req.body.loser)
    .then(id => {
      res.send(JSON.stringify({ preferenceId: id }))
    })
})

app.post('/login', (req, res) => {
  console.log('POST /login')
  let email = req.body.email
  let password = req.body.password
  db.getUserByEmailP(email)
    .then(user => {
      var data = {}
      if (!user) data = { text: 'User not found' }
      else if (!utils.verifyPass(password, user.password)) data = { text: 'Incorrect password' }
      else data = { jwt: utils.signJwt(email, user.id) }
      res.send(JSON.stringify(data))
    })
})

app.post('/register', (req, res) => {
  console.log('POST /register')
  let user = {
    email: req.body.email,
    password: req.body.password,
    cc: req.body.cc,
    zip: req.body.zip,
  }
  db.saveUserP(user)
    .then(id => {
      res.send(JSON.stringify({ userId: id }))
    })
})

// Run
app.listen(3000, () => console.log('Talmud listening on port 3000!'))
