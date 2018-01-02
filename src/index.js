const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


const db = require('./db')
const utils = require('./utils')
const secrets = require('../secrets')

// Instantiate application
const app = express()
app.use(helmet())
app.use(session({secret: secrets.reqSecret}))
app.use(express.static('src/viz'))
app.use(express.static('assets'))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

// Passport setup

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email, password, cb) {
    console.log([email, password])
    db.getUserByEmailP(email)
      .catch(error => cb(error))
      .then(user => {
        console.log(user)
        if (!user) cb(null, false)
        else if (!utils.verifyPass(password, user.password)) cb(null, false)
        else cb(null, user)
      })
  })
)

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
})

passport.deserializeUser(function(id, cb) {
  db.getUserById(id)
    .catch(error => cb(error, null))
    .then(user => cb(null, user))
})

// Define endpoints
app.get('/', (req, res) => {
  console.log('GET /')
  res.send(utils.textToJson('Hello World!'))
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

app.post('/preferences',
  passport.authenticate('local'),
  (req, res) => {
    console.log('POST /preferences')
    db.savePreferenceP(req.body.winner, req.body.loser)
    .then(id => {
      console.log(id)
      res.send(JSON.stringify({ preferenceId: id }))
    })
  })

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
)

app.get('/loginSuccess', (req, res) => {
  console.log('GET /loginSuccess')
  res.send(JSON.stringify({ loggedIn: true }))
})

app.get('/loginFailure', (req, res) => {
  console.log('GET /loginFailure')
  res.send(JSON.stringify({ loggedIn: false }))
})

app.get('/logout', (req, res) => {
  req.logout()
  res.send(JSON.stringify({ loggedIn: false }))
});

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
      console.log(id)
      res.send(JSON.stringify({ userId: id }))
    })
})

// Run
app.listen(3000, () => console.log('Talmud listening on port 3000!'))
