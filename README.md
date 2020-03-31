# Progressive Web Apps - CMDA minor web
## What is this subject about?
This subject is all about converting your client-side rendered webapp to a server-side rendered webapp. By rendering as much as possible on the server, you're not dependent on browser and device compatibality. If Javascript is turned off, it will still render. On top of that, it will speed up the webapp and make it consistent on all devices.

## NPM (dev)dependencies
- [Express](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [Parcel bundler](https://parceljs.org/)
- [Node-fetch](https://www.npmjs.com/package/node-fetch)
- [Nodemon](https://www.npmjs.com/package/node-fetch)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Memory-cache](https://www.npmjs.com/package/memory-cache)
- [Node-fetch](https://www.npmjs.com/package/node-fetch)

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

