const fs = require('fs'),
  express = require('express'),
  path = require("path"),
  app = express(),
  port = process.env.PORT || 3000;
  require('./db/mongoose')

  // Allow CORS
app.all('*', function (req, res, next) {
  var origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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