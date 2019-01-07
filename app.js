const fs = require('fs');
const express = require('express');
const path = require("path");
const hbs = require('hbs');
const merger = require('./file-merger.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
const menuPaths = [{title:'Home',path:'/'},{title:'About',path:'/about'}];

// enabled file write
// setInterval(() => {
//   merger.readAndMerge();
//   console.log('Reading and merging')
// }, 604800000)

const data = JSON.parse(fs.readFileSync('./public/complete.json')).slice(0,2);

hbs.registerHelper('displayDogs', function(dog) {
  return new hbs.SafeString(
    `<div>
    <a href=${this.link} target="_blank">
    <h3 class="name">${this.name}</h3>
    <img src=${this.image} alt=${this.name} />
    <p class="location">${this.location}</p>
    <button>Zobacz</button>
    </a>
    </div>`
  )
});

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Dogs4dopt',
    pathToRender: 'homepage',
    menu: menuPaths,
    dogs: data
  });
});

app.get('/about', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'About page',
    pathToRender: 'about',
    menu: menuPaths
  });
});

app.get('/api', (req, res, next) => {
  const data = JSON.parse(fs.readFileSync('./public/complete.json'));
  res.json(data);
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
