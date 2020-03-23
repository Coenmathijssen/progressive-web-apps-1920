// import { fetchNew } from './API.js'
const fetchSec = require('./API.js')

const fetch = require('node-fetch')

// Render the right pages and data per page
const express = require('express')
const router = express.Router()

// Getting data from localStorage

// Rendering homescreen
router.get('/overview', renderOverview)

async function renderOverview (req, res) {
  const data = await fetchNew('beers')
  res.render('overview', {
    data
  })
}

console.log(fetchSec('beers'))

// console.log('joe ', data)

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
    beer.labels ? image = beer.labels.large : image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'

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

module.exports = router
