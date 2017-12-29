const express = require('express')
const helmet = require('helmet')

const db = require('./db')

// Instantiate application
const app = express()
app.use(helmet())
app.use(express.static('src/viz'))
app.use(express.static('static'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

// Define endpoints
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/identities', (req, res) => {
  db.getIdentitiesP()
    .then(function(rows) { res.send(rows) })
})

app.get('/preferences', (req, res) => {
  db.getPreferencesP()
    .then(function(rows) { res.send(rows) })
})

// Run
app.listen(3000, () => console.log('Talmud listening on port 3000!'))
