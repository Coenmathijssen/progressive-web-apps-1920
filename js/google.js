export function initMap (breweryGeo) {
  const map = new google.maps.Map(
    document.getElementById('map'),
    { zoom: 1.3,
      center: { lat: 52.37403, lng: 4.88969 }
    })

  const icons = {
    beer: {
      icon: './beer-pin.00e7e96a.png'
    }
  }

  let features = [
    {
      position: new google.maps.LatLng(breweryGeo.lat, breweryGeo.lng),
      type: 'beer'
    }
  ]

  // Create markers.
  for (let i = 0; i < features.length; i++) {
    let marker = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      map: map
    })
  }
}

async function getGeo (address) {
  const response = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.key}`))
  const data = await response.json()
  const returnedData = data.results[0]
  if (!returnedData.address_components[6]) {
    window.alert('Brewery not found on map')
    return null
  } else {
    return returnedData.geometry.location
  }
}

module.exports = { initMap, getGeo }
