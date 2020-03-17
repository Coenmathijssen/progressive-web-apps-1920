function matchItem (data, id) {
  const foundItem = data.filter(found => { return found.id === id })
  return foundItem[0]
}

function appear (data) {
  const image = document.getElementById('detail-image')
  const title = document.getElementById('detail-title')
  const abv = document.getElementById('detail-abv')
  const created = document.getElementById('detail-created')
  const type = document.getElementById('detail-type')
  const organic = document.getElementById('detail-organic')
  const production = document.getElementById('detail-production')
  const description = document.getElementById('detail-description')

  // Assign image
  image.src = data.image

  // Assign title
  title.textContent = data.name

  // Assign abv
  abv.textContent = data.abv

  // Assign creation date
  created.textContent = data.date

  // Assign type
  type.textContent = data.type

  // Assign description
  description.textContent = data.descLong

  // Check if the beer is organic and display a cross or check correspondently
  data.isOrganic === 'N' ? organic.src = './cross.f1a68627.svg' : organic.src = './check.74abe2b1.svg'

  // Check if the beer is still in production and display a cross or check correspondently
  data.isRetired !== 'N' ? production.src = './cross.f1a68627.svg' : production.src = './check.74abe2b1.svg'

  // Display the detailpage with a class add
  const detail = document.getElementsByClassName('detail')[0]
  detail.classList.add('visible')
}

module.exports = { matchItem, appear }
