const fs = require('fs'),
  express = require('express'),
  path = require("path"),
  hbs = require('hbs'),
  registrar = require('handlebars-registrar'),
  app = express(),
  port = process.env.PORT || 3000,
  generateShelterPages = require('./helpers/generateShelterPages');

const variables = require('./helpers/variables'),
  homeRouter = require('./routers/home'),
  aboutRouter = require('./routers/about'),
  searchRouter = require('./routers/search'),
  listRouter = require('./routers/list'),
  mapRouter = require('./routers/map');

  // comment this out to disable page scraping
  // setInterval(() => {
  //   merger.readAndMerge();
  //   console.log('Reading and merging')
  // }, 604800000) // week = 604800000

  const data = JSON.parse(fs.readFileSync('./public/complete.json')).filter(dog => !dog.name.includes("&#xFFFD")).sort(() => .5 - Math.random()).slice(0, 20);

  // filter with !dog.name.includes excludes dogs with accented characters in names due to not supporting these characters by page scrappers. This has to be fixed

  app.set('variables', variables)
  app.set('data', data)
  app.set('view engine', 'hbs')
  app.use(express.static(path.join(__dirname, '/public')))

  app.use(aboutRouter)
  app.use(homeRouter)
  app.use(searchRouter)
  app.use(listRouter)
  app.use(mapRouter)

registrar(hbs, {
  helpers: './helpers/hbs-helpers/*.js',
  partials: ['./views/partials/*.{hbs,js}']
});

generateShelterPages(app, variables.shelters, variables.menuShelters, variables.menuPaths, data);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});