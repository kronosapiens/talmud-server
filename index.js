const express = require('express')
const helmet = require('helmet')

// Instantiate application
const app = express()
app.use(helmet())

// Define endpoints
app.get('/', (req, res) => res.send('Hello World!'))

// Run
app.listen(3000, () => console.log('Talmud listening on port 3000!'))