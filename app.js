const fs = require('fs');
const axios = require('axios');
const express = require('express');
const path = require("path");
const hbs = require('hbs');
const src = "https://secure-inlet-25572.herokuapp.com";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

const menuPaths = [{
  title: 'Home',
  path: '/'
}, {
  title: 'About',
  path: '/about'
}];

async function getSrc(src) {
  const fetched = await axios.get(src);
  return fetched.data.slice(5, 10);
}

getSrc(src)
  .then(function(res) {
    fs.writeFileSync('dogs.json', JSON.stringify(res));
  })
  .catch(function(err) {
    console.log(err)
  })

  const data = JSON.parse(fs.readFileSync('dogs.json'));

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

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
