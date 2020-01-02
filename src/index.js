require('dotenv').config()

const fs = require('fs')
const https = require('https')

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportJwt = require('passport-jwt')

const db = require('./db')
const mailer = require('./mailer')
const utils = require('./utils')

// Instantiate application
const app = express()
app.use(helmet())
app.use(express.static('src/viz'))
app.use(express.static('assets'))
app.use(bodyParser.json())
app.use(passport.initialize())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})

// Passport setup
const passportOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
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
  res.send(JSON.stringify({ text: 'Hello Talmud!' }))
})

app.get('/preferences', (req, res) => {
  console.log('GET /preferences')
  db.getPreferencesP()
    .then(rows => res.send(rows) )
    .catch(error => res.send(JSON.stringify({ text: error.detail })))
})

app.post('/preferences', authJwt, (req, res) => {
  console.log('POST /preferences')
  db.saveOrUpdatePreferenceP(req.user.id, req.body.winner, req.body.loser)
    .then(id => res.send(JSON.stringify({ preferenceId: id })))
    .catch(error => res.send(JSON.stringify({ text: error.detail })))
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
      else data = { jwt: utils.signJwt(user) }
      res.send(JSON.stringify(data))
    })
    .catch(error => res.send(JSON.stringify({ text: error.detail })))
})

app.post('/register', (req, res) => {
  console.log('POST /register')
  let user = {
    email: req.body.email,
    password: req.body.password,
    cc: req.body.cc,
    zip: req.body.cc === "US" ? req.body.zip : "",
    gender: req.body.gender,
    relationship: req.body.relationship,
    siblings: req.body.siblings,
    children: req.body.children,
    religion: req.body.religion,
    ethnicity: req.body.ethnicity,
    job: req.body.job,
    party: req.body.party,
  }
  db.saveUserP(user)
    .then(user => res.send(JSON.stringify({ jwt: utils.signJwt(user) })))
    .catch(error => res.send(JSON.stringify({ text: error.detail })))
})

app.post('/update', authJwt, (req, res) => {
  console.log('POST /update')
  let updatedUser = {
    cc: req.body.cc,
    zip: req.body.cc === "US" ? req.body.zip : "",
    gender: req.body.gender,
    relationship: req.body.relationship,
    siblings: req.body.siblings,
    children: req.body.children,
    religion: req.body.religion,
    ethnicity: req.body.ethnicity,
    job: req.body.job,
    party: req.body.party,
  }
  db.updateUserP(req.user.id, updatedUser)
    .then(user => res.send(JSON.stringify({ jwt: utils.signJwt(user) })))
    .catch(error => res.send(JSON.stringify({ text: error.detail })))
})

// Run
const msg = `Running on port ${process.env.PORT} as ${process.env.USER}`

if (process.env.USE_SSL) {
  console.log("Running with SSL")
  sslConfig = { key: fs.readFileSync(process.env.SSL_KEY), cert: fs.readFileSync(process.env.SSL_CERT) }
  https.createServer(sslConfig, app).listen(process.env.PORT, () => console.log(msg))
} else {
  app.listen(process.env.PORT, () => console.log(msg))
}
