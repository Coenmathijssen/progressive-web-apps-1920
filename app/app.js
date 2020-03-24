require('dotenv').config()
const express = require('express')
const path = require('path')

// Init Express
const app = express()
const port = process.env.PORT

// Know which port Express is using
app.listen(port, () => console.log(`Listining to this port: ${port}!`))

// View Engine init
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//  Serve html, css and js files in the static directory
app.use(express.static(path.join(__dirname, 'dist')))

// Importing files
const renderPages = require('./js/renderPages.js')
app.use(renderPages)

// Importing files
// const google = require('./js/google.js')
// app.use(google)

// app.get('/', (req, res) => res.send('Hello World!'))

