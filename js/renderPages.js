// Import files
const { fetchBeers, matchItem } = require('./data.js')

// Render the right pages and data per page
const express = require('express')
const router = express.Router()

// Rendering homescreen
router
  .get('/', renderOverview)
  .get('/offline', (req, res) => {
    res.render('offline')
  })
  .get('/:id', renderDetailPage)

async function renderOverview (req, res) {
  const data = await fetchBeers('beers')
  res.render('overview', {
    data
  })
}

async function renderDetailPage (req, res) {
  const id = await req.params.id
  console.log('ID: ', id)
  const data = await fetchBeers('beers')
  const matchedItem = await matchItem(data, id)
  res.render('detailPage.ejs', {
    data: matchedItem
  })
}

module.exports = router
