// import { fetchNew } from './API.js'
// const fetchNew = require('./API.js')

const fetch = require('node-fetch')

// Render the right pages and data per page
const express = require('express')
const router = express.Router()

// Caching setup
const mcache = require('memory-cache')

let cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000)
        res.sendResponse(body)
      }
      next()
    }
  }
}

// Rendering homescreen
router
  .get('/', cache(10), renderOverview)
  .get('/offline', (req, res) => {
    res.render('offline')
  })
  .get('/:id', cache(10), renderDetailPage)

async function renderOverview (req, res) {
  const data = await fetchNew('beers')
  res.render('overview', {
    data
  })
}

async function renderDetailPage (req, res) {
  const id = await req.params.id
  console.log('ID: ', id)
  const data = await fetchNew('beers')
  const matchedItem = await matchItem(data, id)
  res.render('detailPage.ejs', {
    data: matchedItem
  })
}

// Data fetch and clean
async function fetchNew (endpoint) {
  return fetch(`${process.env.apiUrl}${endpoint}/?key=${process.env.key}`)
    .then(async response => {
      const data = await response.json()
      return data
    })
    .then(data => {
      return clean(data.data)
    })
    .catch(err => {
      console.log('error:', err)
    })
}

function clean (data) {
  return data.map(beer => {
    let image
    beer.labels ? image = beer.labels.large : image = './no-image.2f1a8e61.png'

    let abv
    beer.abv === undefined ? abv = 'alc. -%' : abv = 'alc. ' + beer.abv + '%'

    let type
    beer.style ? type = beer.style.shortName : type = 'No name available'

    let descShort
    beer.style === undefined ? descShort = 'No description available' : descShort = beer.style.description.match(/\b[\w']+(?:[^\w\n]+[\w']+){0,30}\b/g)[0] + '...'

    let descLong
    beer.style === undefined ? descLong = 'No description available' : descLong = beer.style.description

    return {
      id: beer.id,
      name: beer.name,
      abv: abv,
      isOrganic: beer.isOrganic,
      isRetired: beer.isRetired,
      image: image,
      date: beer.createDate.slice(0, -9),
      type: type,
      descShort: descShort,
      descLong: descLong
    }
  })
}

// Finding the corresponding data
function matchItem (data, id) {
  const foundItem = data.filter(found => { return found.id === id })
  return foundItem[0]
}

module.exports = router
