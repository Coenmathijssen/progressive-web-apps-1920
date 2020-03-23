// import API from './API.js'

// const dataTest = await API.fetchNew('beers')
// console.log('werkt? ', dataTest)

const fetch = require('node-fetch')

// Render the right pages and data per page
const express = require('express')
const router = express.Router()

/*  All the urls that will be hit will render the right pages in this file. All the functions will first check if a session exists.
If not, the user will be redirected to the login page. If the session does exist, the page of the given url will be rendered.
The content needed to be rendered will be passed along in the res.render functions. */

// Getting data from localStorage

// Rendering homescreen
router.get('/home', homePage)

async function homePage(req, res) {
  const data = await fetchNew('beers')
  res.render('joe', {
    data
  })
}

// console.log('joe ', data)

async function fetchNew (endpoint) {
  const apiUrl = 'https://sandbox-api.brewerydb.com/v2/'
  const key = '73685041c0bfbe5aa327c0c735d3bb0c'

  return fetch(`${apiUrl}${endpoint}/?key=${key}`)
    .then(async response => {
      const data = await response.json()
      return data
    })
    .then(data => {
      console.log(clean(data.data))
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
