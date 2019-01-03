const fs = require('fs');
const axios = require('axios');
const express = require('express');
const hbs = require('hbs');


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.listen(port, () => {console.log(`Server is up on port ${port}`)});
