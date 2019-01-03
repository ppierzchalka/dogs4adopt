const fs = require('fs');
const axios = require('axios');
const express = require('express');
var path = require("path");
const hbs = require('hbs');


const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '/public')));
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Websited NodeJS Website',
    bodyContent: 'Hi, and welcome to my newly created nodejs webpage'
  });
});

app.listen(port, () => {console.log(`Server is up on port ${port}`)});
