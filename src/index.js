const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser');

const db = require('./db')

// Instantiate application
const app = express()
app.use(helmet())
app.use(express.static('src/viz'))
app.use(express.static('assets'))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

// Define endpoints
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/identities', (req, res) => {
  db.getIdentitiesP()
    .then(rows => res.send(rows))
})

app.get('/preferences', (req, res) => {
  db.getPreferencesP()
    .then(rows => res.send(rows) )
})

app.post('/preferences', (req, res) => {
  db.savePreferenceP(req.body.winner, req.body.loser)
    .then(id => {
      console.log(id)
      res.send(JSON.stringify({ preferenceId: id }))
    })
})

// Run
app.listen(3000, () => console.log('Talmud listening on port 3000!'))
