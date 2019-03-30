const fs = require('fs'),
  express = require('express'),
  path = require("path"),
  hbs = require('hbs'),
  registrar = require('handlebars-registrar'),
  merger = require('./file-merger.js'),
  app = express(),
  port = process.env.PORT || 3000;
  require('./db/mongoose')

  // Function which generates menu links
  const generateShelterPages = require('./helpers/generateShelterPages');

  // Global Variables to use
  const variables = require('./helpers/variables');

  // ROUTERS
  const homeRouter = require('./routers/home'),
  aboutRouter = require('./routers/about'),
  searchRouter = require('./routers/search'),
  listRouter = require('./routers/list'),
  mapRouter = require('./routers/map'),
  apiRouter = require('./routers/api');


  // // comment this out to disable page scraping
  // merger.readAndMerge().then(dogsData => merger.saveDogs(dogsData));
  // setInterval(() => {
  //   readAndMerge().then(dogsData => saveDogs(dogsData));
  //   console.log('Reading and merging')
  // }, 604800000) // week = 604800000


  // Sets global variables to use in multiple functions
  app.set('variables', variables)

  // Sets data from page scraper to use in multiple places
  // app.set('data', data)
  app.set('view engine', 'hbs')

  // Sets folder to be accesible from url
  app.use(express.static(path.join(__dirname, '/public')))

  // Routers registration
  app.use(homeRouter)
  app.use(aboutRouter)
  app.use(searchRouter)
  app.use(listRouter)
  app.use(mapRouter)
  app.use(apiRouter)

  //Handlebars templates and helpers registration
registrar(hbs, {
  helpers: './helpers/hbs-helpers/*.js',
  partials: ['./views/partials/*.{hbs,js}']
});

generateShelterPages(app, variables.shelters, variables.menuShelters, variables.menuPaths);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});