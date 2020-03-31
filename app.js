require('dotenv').config()
const express = require('express')
const path = require('path')

// Init Express
const app = express()

// Know which port Express is using
app.listen(process.env.PORT || 3000)

// View Engine init
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//  Serve html, css and js files in the static directory
app.use(express.static(path.join(__dirname, 'dist')))

// Importing files
const renderPages = require('./js/renderPages.js')
app.use(renderPages)
