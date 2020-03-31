// import Data from './data.js'

// const fetch = require('node-fetch')

// export async function fetchData (endpoint) {
//   const corsFix = 'https://cors-anywhere.herokuapp.com/'
//   const apiUrl = 'https://sandbox-api.brewerydb.com/v2/'
//   const key = '73685041c0bfbe5aa327c0c735d3bb0c'

//   if (window.localStorage.getItem('data') === null) {
//     enableLoader()
//     const response = await fetch(`${corsFix}${apiUrl}${endpoint}/?key=${key}`)
//     const data = await response.json()
//     console.log('Recieved data from fetch, status:', data.status)
//     console.log(data.data)
//     const dataClean = Data.clean(data.data)
//     window.localStorage.setItem('data', JSON.stringify(dataClean))
//     return dataClean
//   } else {
//     const dataClean = JSON.parse(window.localStorage.getItem('data'))
//     console.log('Data received from local storage')
//     return dataClean
//   }
// }

// export async function fetchNew (endpoint) {
//   const corsFix = 'https://cors-anywhere.herokuapp.com/'
//   const apiUrl = 'https://sandbox-api.brewerydb.com/v2/'
//   const key = '73685041c0bfbe5aa327c0c735d3bb0c'

//   return fetch(`${corsFix}${apiUrl}${endpoint}/?key=${key}`)
//     .then(async response => {
//       const data = await response.json()
//       return data
//     })
//     .then(data => {
//       return Data.clean(data.data)
//     })
// }

// // console.log('werkt? ', dataTest)

// export async function fetchBreweries (endpoint) {
//   const corsFix = 'https://cors-anywhere.herokuapp.com/'
//   const apiUrl = 'https://sandbox-api.brewerydb.com/v2/'
//   const key = '73685041c0bfbe5aa327c0c735d3bb0c'

//   const response = await fetch(`${corsFix}${apiUrl}${endpoint}/?key=${key}`)
//   const data = await response.json()
//   return data
// }

// function enableLoader () {
//   const loader = document.getElementsByClassName('loader')[0]
//   loader.classList.add('visible')
// }

// module.exports = { fetchData, fetchBreweries, fetchNew }

// export async function fetchNew (endpoint) {
//   return fetch(`${process.env.apiUrl}${endpoint}/?key=${process.env.key}`)
//     .then(async response => {
//       const data = await response.json()
//       return data
//     })
//     .then(data => {
//       return clean(data.data)
//     })
//     .catch(err => {
//       console.log('error:', err)
//     })
// }

module.exports = { fetchNew }
