const fs = require('fs'),
  express = require('express'),
  path = require("path"),
  app = express(),
  port = process.env.PORT || 3000;
  require('./db/mongoose')

  // ROUTERS
  apiRouter = require('./routers/api'),
  scraperRouter = require('./routers/scraper');

  // Sets folder to be accesible from url
  app.use(express.static(path.join(__dirname, '/public')))

  // Routers registration
  app.use(apiRouter)
  app.use(scraperRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});