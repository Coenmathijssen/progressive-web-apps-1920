// Importing polyfill to make async functions work in Parcel
import 'babel-polyfill'

// Importing all functions
import API from './API.js'
import Assign from './assign.js'
import Router from './router.js'
import Data from './data.js'

const data = await API.fetchData()
console.log('hi ', data)

console.log('hi')

// Starting initiziation
init()

function init () {
  const dataTest = await API.fetchNew('beers')
  console.log('werkt? ', dataTest)

  // API.fetchData('beers').then(data => {
  //   disableLoader()
  //   console.log('We got dem data: ', data)

  //   // Assign data to overview
  //   Assign.data(data)

  //   // Render detailpage on click with router
  //   Router.renderDetailPage(data)
  // })
}

// Toggle classes to let detailpage appear
const close = document.getElementsByClassName('close')[0]
close.addEventListener('click', detailDisappear)

function detailDisappear () {
  const detail = document.getElementsByClassName('detail')[0]
  detail.classList.remove('visible')
}

// Filter and sort
function renderFilteredData () {
  const data = JSON.parse(window.localStorage.getItem('data'))
  Assign.data(Data.sort(data))
}

function renderFilteredDataReverse () {
  const data = JSON.parse(window.localStorage.getItem('data'))
  Assign.data(Data.sortReverse(data))
}

function search () {
  const data = JSON.parse(window.localStorage.getItem('data'))
  console.log(Data.search(data))
  Assign.data(Data.search(data))
}

// Trigger filter on keyup
const alphabetical = document.getElementsByClassName('a-z')[0]
alphabetical.addEventListener('click', renderFilteredData)

const alphabeticalReverse = document.getElementsByClassName('z-a')[0]
alphabeticalReverse.addEventListener('click', renderFilteredDataReverse)

const input = document.getElementById('search')
input.addEventListener('keyup', search)


function disableLoader () {
  const loader = document.getElementsByClassName('loader')[0]
  loader.classList.remove('visible')
}

