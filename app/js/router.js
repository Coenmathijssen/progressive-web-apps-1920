import detailPage from './detailPage.js'
import API from './API.js'
import Google from './google.js'
const routie = require('./modules/routie.js')

function renderDetailPage (data) {
  routie({
    ':id': (id) => {
      const foundItem = detailPage.matchItem(data, id)
      detailPage.appear(foundItem)

      API.fetchBreweries(`beer/${id}/breweries`).then(data => {
        const brewery = data.data[0].name
        const breweryGeo = Google.getGeo(brewery)
        return breweryGeo
      }).then(breweryGeo => {
         Google.initMap(breweryGeo)
      })
    },
    'about': () => {
      console.log('about')
    }
  })
}

module.exports = { renderDetailPage }
