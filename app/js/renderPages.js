// Render the right pages and data per page
const express = require('express')
const router = express.Router()

/*  All the urls that will be hit will render the right pages in this file. All the functions will first check if a session exists.
If not, the user will be redirected to the login page. If the session does exist, the page of the given url will be rendered.
The content needed to be rendered will be passed along in the res.render functions. */

// Rendering homescreen
router.get('/hi', (req, res, data) => {
  res.render('hi', {
    data: 'hi'
  })
})

router.get('/test', (req, res, data) => {
  res.render('test', {
    data: 'hi'
  })
})

module.exports = router
