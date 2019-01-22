const fs = require('fs');
const express = require('express');
const path = require("path");
const hbs = require('hbs');
const paginate = require('express-paginate');
const merger = require('./file-merger.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
const menuPaths = [{title:'Strona Głowna',path:'/'},{title:'Informacje',path:'/about'}];
const menuShelters = [];
const shelters = ['Łódź','Jelenia Góra','Dłużyna Górna']

// comment this out to disable page scraping
// setInterval(() => {
//   merger.readAndMerge();
//   console.log('Reading and merging')
// }, 604800000) // week = 604800000

const data = JSON.parse(fs.readFileSync('./public/complete.json')).sort(() => .5 - Math.random()).slice(0,20);

hbs.registerHelper('displayDogs', function(dog) {
  return new hbs.SafeString(
    `<a href=${this.link} target="_blank">
    <h3 class="name">${this.name}</h3>
    <div class="img-crop">
    <img class="dog-img" src=${this.image} alt=${this.name} onerror="this.onerror=null;this.src='/images/noimage.png';"/>
    </div>
    <p class="location">Lokalizacja: ${this.location}</p>
    <button class="view">Zobacz</button>
    </a>`
  )
});

function generateShelterPages(list) {
  list.forEach(shelter => {
    menuShelters.push({title: shelter, path: `/${encodeURIComponent(shelter)}`})
    app.get(`/${encodeURIComponent(shelter)}`, (req, res) => {

      res.render('index.hbs', {
        pageTitle: `Schronisko ${shelter}`,
        pathToRender: 'shelter',
        menu: menuPaths,
        shelters: menuShelters,
        dogs: data.filter(dog => dog.location === shelter),
      });
    });
  })
}

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Dogs4dopt',
    pathToRender: 'homepage',
    menu: menuPaths,
    shelters: menuShelters,
    dogs: data.sort(() => .5 - Math.random()).slice(0,4)
  });
});

app.get('/about', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Informacje',
    pathToRender: 'about',
    menu: menuPaths,
    shelters: menuShelters
  });
});

app.get('/search', function(req, res) {
      res.render('index.hbs', {
        pageTitle: 'Wyniki Wyszukiwania',
        pathToRender: 'search',
        menu: menuPaths,
        shelters: menuShelters,
        dogs: data.filter(item => item.name.toLowerCase().includes(req.query['name'].toLowerCase()))
      });
});

app.get('/all', (req, res) => {
  res.render('index.hbs', {
    pageTitle: `Wszystkie zwierzęta`,
    pathToRender: 'shelter',
    menu: menuPaths,
    shelters: menuShelters,
    dogs: data,
  });
});

app.get('/map', (req, res) => {
  res.render('index.hbs', {
    pageTitle: `Wszystkie zwierzęta`,
    pathToRender: 'map',
    menu: menuPaths,
    shelters: menuShelters,
    dogs: data,
  });
});

app.get('/api', (req, res, next) => {
  const data = JSON.parse(fs.readFileSync('./public/complete.json'));
  res.json(data);
})

generateShelterPages(shelters);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
