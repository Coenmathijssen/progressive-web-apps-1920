# Progressive Web Apps - CMDA minor web
<img width="1280" alt="Screenshot 2020-03-31 at 16 02 32" src="https://user-images.githubusercontent.com/43337909/78035230-1a67ec00-7369-11ea-8ddf-0d0693fac369.png">

## What is this subject about?
This subject is all about converting your client-side rendered webapp to a server-side rendered webapp. By rendering as much as possible on the server, you're not dependent on browser and device compatibality. If Javascript is turned off, it will still render. On top of that, I will use progressive web app enhancements to increase loading speed, offline use, usability, installabiltiy and make it look and feel like a real app.

## Features 
- Server-side rendering
- Offline 
- Static and dynamic caching with Service Worker
- Browser caching
- Gzip compression
- Minification of CSS and JS
- Critical rendering path optimalisation

## What I changed for my re-examination
- The Service Worker is working properly now. It previously cached wrong files.
- The Service Worker is now able to cache dynamically loaded content, not only the static index page and css file. If you now visit a page, it will be cached and also be viewable offline.
- More Critical Path Rendering: Gzip compression on requests, browser caching.
- Browser caching.
- Better structured code: seperating in modules.

## NPM (dev)dependencies
- [Express](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [Parcel bundler](https://parceljs.org/)
- [Node-fetch](https://www.npmjs.com/package/node-fetch)
- [Nodemon](https://www.npmjs.com/package/node-fetch)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Node-sass](https://www.npmjs.com/package/node-sass)
- [compression](https://www.npmjs.com/package/compression)

## Install
1. Open the terminal on your computer.
2. Create a directory in a location of your choice with `mkdir` in your console.
3. Clone the repository with the following command:
<br></br>
`https://github.com/Coenmathijssen/progressive-web-apps-1920.git`
<br></br>
4. Navigate to the repo with the `cd` command in your console. Next, install all the dependencies with 
<br></br>
`npm install`
<br></br>
5. For building, bundling and compiling of the SCSS and JS, use
<br></br>
`npm run build`
<br></br>
6. To develop and see changes live, use this in your first window of your terminal:
<br></br>
`npm run watch`
<br></br>
And this in your second window of your terminal:
<br></br>
`npm run dev`
<br></br>
These commands are editable in the package.json file
<br></br>
6. Open the localhost to view the webapp.

## Deployment
Deploy website on Heroku:
1. Go to https://www.heroku.com/ and sign in (or create an account).
2. Create new app.
3. Connect the Git repo to your Heroku.
4. Change the directory to 'dist'.
5. Run the installation commands in your terminal.

## Learning goals and how I achieved them
### You know the difference between client- and server-side rendering. You are able to apply SSR to display data from an API
#### Installing and setting up Express & EJS
First I needed to setup a server to enable SSR. I chose Express for this task. It's easy to setup and I've already tried it before. I installed it via NPM and created an app.js with the basic server setup:

```javascript
require('dotenv').config()
const express = require('express')
const path = require('path')

// Init Express
const app = express()

// Know which port Express is using
app.listen(process.env.PORT || 3000)

// View Engine init
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//  Serve html, css and js files in the static directory
app.use(express.static(path.join(__dirname, 'dist')))

// Importing files
const renderPages = require('./js/renderPages.js')
app.use(renderPages)
```
Next Next I needed to rewrite my HTML to EJS. So I splitted up my page into as many modules as I could find. 

**EJS Modules**
- Head. With all the required script and meta tags, so I don't have to repeat myself.
- Search. The search section is also an indivual piece.
- Article. Every data object from the API will be put in an article. These articles together define my webapp overview.
- Footer. For script tags and credits

**EJS pages**
- Overview page. An introduction together with a collection of all the article modules
- Detail page. Detailed information about the clicked beer.

I seperated all these parts and wrote them in EJS. I could easily inject the data through EJS now, because it's server-side rendered.

Next I need to create a page to render the corresponding pages when a route is hit. I did so in my renderPages.js file:

```javascript
router
  .get('/', cache(10), renderOverview)
  .get('/:id', cache(10), renderDetailPage)

async function renderOverview (req, res) {
  console.log('running overview')
  const data = await fetchNew('beers')
  res.render('overview', {
    data
  })
}

async function renderDetailPage (req, res) {
  console.log('running render')
  const id = await req.params.id
  console.log('ID: ', id)
  const data = await fetchNew('beers')
  const matchedItem = await matchItem(data, id)
  res.render('detailPage.ejs', {
    data: matchedItem
  })
}
```

These function are asynchronous, because I have to wait for the data (promise) to be fully loaded, before I can render everything. I will elaborate on this further.

### Rewriting the fetch
The regular fetch method doesn't work server-side. So I had to install node-fetch for it to work. Next, I had to rewrite my fetch code a little, resulting in:
```javascript
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
```

### Rewriting how my detail page is displayed.
First my 'detail page' was actually inside my index.html. It was positioned absolute and the content was changed when clicked on an article. Now that it is SSR, I wanted to generate a different page (with the unique id) and generate the corresponding data with EJS. So I did.

## You understand how a Service Worker is used and are able to implement it in your webapp.
When Declan first spoke about the Service worker, I thought two things: 1. Wow this is really awesome. 2. This is a very difficult subject to grasp completely. I understood what it did, but I got really confused by the syntax. Following his explanation, I went to Google to get a better understanding. And what would be a better explanation, then from Google itself. 

A Service Worker is a Javascript worker which can't access the DOM directly. However, it functions as a middle man between the client and the server/db. By being so, it allows you to control how network requests from your page are handled. Say you are requesting a css file which hasn't been changed. The Service Worker can serve it directly to you, because it has saved that version before. When the file does change, it will let you get the file from the server. Then the service worker will save the file again, so it can serve it to you faster (if it isn't changed). Very cool stuff!

This is the lifecycle of the service worker. You can manipulate (almost) every state:
![sw-lifecycle](https://user-images.githubusercontent.com/43337909/78029560-1afc8480-7361-11ea-99f6-5fef251faf47.png)

I implemented the full [tutorial](https://developers.google.com/web/fundamentals/primers/service-workers). Resulting in the following Service Worker.

### Installing and activating the Service Worker.
Here I create two variables. One for the site cache, and one for the dynamic cache (will explain this further on). I've put the urls of static files to cache into an array. Then on install, I open the `CACHE_NAME` and store all static files in it. So when it is activated, it can find the cached files in the cache.

```javascript
const CACHE_NAME = 'site-cache-v1'
const DYNAMIC_CACHE = 'site-dynamicCache-v1'
const urlsToCache = [
  '/',
  '/main.a363ad46.css',
  '/offline',
  '/beer.871b719e.svg',
  '/no-image.2f1a8e61.png',
  '/beer.f10eb841.png',
  '/cross.894172ec.svg',
  '/check.f3544deb.svg',
  'https://fonts.googleapis.com/css2?family=Raleway:wght@600;700&display=swap'
]

// Installing the service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
      .then(() => self.skipWaiting())
  )
})
```
When activating the SW, I get an array of all cached keys (you can see it as storage drawers). Then I lop over them, and check if it matches with `CACHE_NAME`. A matched item is thrown out, because I already have that cache. It is deleted with the caches.delete() function. Now I have versioning in my cache.

```javascript
// activating the sw
self.addEventListener('activate', event => {
  event.waitUntil(
    // Array of all cache keys
    caches.keys().then(keys => {
      // Resolve all promises of keys
      return Promise.all(
        // Delete keys which are equal to current CACHE_NAME
        // Keep the cache of the key which matches
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ).catch(err => {
        console.log('could not delete old cache: ', err)
      })
    })
  )

  console.log('Service worker activated')
})
```

### Dynamic caching with the Service Worker
Here I catch the fetch event. Then, I check if the requested files are already in the cache. If that's the case, the function will end and return the cached files. If it isn't already cached, I'm storing it into my dynamic cache variable. This will mean that next time this page is loaded, it's available in cache (so it can be served much quicker and is also available offline). The more pages you visit, the more is available online.

If the user is offline and the page isn't available in cache, I'm rededirecting the user to an cached offline page.

```javascript
// Cache and return request
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheResponse => {
        // Check if request already in static cache, return and exist if that's the case
        if (cacheResponse) {
          return cacheResponse
        }
        // If not, fetch from server
        return fetch(event.request)
          // Store dynamic (page) fetch in DYNAMIC_CACHE which isn't now
          .then(fetchResponse => {
            return caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(event.request.url, fetchResponse.clone())
              return fetchResponse
            })
          })
      }
      ).catch(err => {
        console.log('offline: ', err)
        return caches.match('/offline')
      })
  )
})
```


## You understand the critical rendering path and how you can optimize it to improve your webapp.
With the tutorial of Declan, I now understand how you can view your critical rendering path and implement improvements. I found that setting your network on 3g and check your network waterfall and snapshots, in combination with the Google Audit tool, will give you a good insight where improvements could be made. My first score was:
<img width="1187" alt="Screenshot 2020-03-31 at 10 12 42" src="https://user-images.githubusercontent.com/43337909/78030327-32883d00-7362-11ea-9f5b-7e0ad7cc24eb.png">

### How I improved this score:
- I minified my CSS and JavaScript with the help of the Parcel Bundler. Which got my **Javascript file to 170kb (first was 359kb)** and my **CSS file to from 6kb (first was 8kb)**
- I compressed all my images (svg, png and jpg). Again with the parcel bundler. 
- I gave all my images alt tags.
- I fixed some console.log errors. 
- I implemented browser caching. This is actually very simple. All page requests are cached into the browser for a week time. This is my browser caching code inside my app.js:

```javascript 
// Use caching
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
app.use((req, res, next) => {
  // Keep cache one week
  res.header('Cache-Control', 'max-age=604800')
  next()
})
```

- I compressed most of my responses using Gzip and `compression`, to decrease file size and make everything load faster:

```javascript
const compression = require('compression')
// Compress all responses
app.use(compression())
```

All these implementations resulted in the following Audit scores:
<img width="1093" alt="Screenshot 2020-03-31 at 13 02 19" src="https://user-images.githubusercontent.com/43337909/78031515-f229be80-7363-11ea-99e8-c09ce48ab26d.png">
<img width="725" alt="Screenshot 2020-03-31 at 15 25 38" src="https://user-images.githubusercontent.com/43337909/78031523-f48c1880-7363-11ea-9fe0-3f8114c96ce5.png">
<img width="730" alt="Screenshot 2020-03-31 at 15 25 46" src="https://user-images.githubusercontent.com/43337909/78031533-f6ee7280-7363-11ea-8256-04093fac6972.png">

I couldn't fix the link issue, because I have links around the articles to redirect to a generated page with the corresponding data. However, these links can't have a name. On top of that, I didn't have time to implement a HTTP2 method.
