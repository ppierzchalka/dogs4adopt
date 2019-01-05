const fs = require('fs');
const axios = require('axios');
const express = require('express');
const path = require("path");
const hbs = require('hbs');
const src = "https://secure-inlet-25572.herokuapp.com";
let data = {
  dogs: [{
      name: 'Pies',
      image: 'http://www.schronisko-lodz.pl/gfx/abase/abase_201901/27870_20190103_103811_003.jpg',
      link: 'http://www.schronisko-lodz.pl/?p=adopcje&a=view_details&id=27870',
      location: 'Lodz'
    },
    {
      name: 'Pies',
      image: 'http://www.schronisko-lodz.pl/gfx/abase/abase_201901/27874_20190103_122913_007.jpg',
      link: 'http://www.schronisko-lodz.pl/?p=adopcje&a=view_details&id=27874',
      location: 'Lodz'
    },
    {
      name: 'Pies',
      image: 'http://www.schronisko-lodz.pl/gfx/abase/abase_201901/27875_20190103_125642_002.jpg',
      link: 'http://www.schronisko-lodz.pl/?p=adopcje&a=view_details&id=27875',
      location: 'Lodz'
    },
    {
      name: 'Pies',
      image: 'http://www.schronisko-lodz.pl/gfx/abase/abase_201901/27878_20190103_155159_005.jpg',
      link: 'http://www.schronisko-lodz.pl/?p=adopcje&a=view_details&id=27878',
      location: 'Lodz'
    },
    {
      name: 'Pies',
      image: 'http://www.schronisko-lodz.pl/gfx/abase/abase_201901/27879_20190104_085748_001.jpg',
      link: 'http://www.schronisko-lodz.pl/?p=adopcje&a=view_details&id=27879',
      location: 'Lodz'
    }
  ]
};

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
    dogs: data.dogs
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

// async function getSrc(src) {
//   const data = await axios.get(src);
//   return data.data.slice(0, 5);
// }
//
// getSrc(src)
//   .then(function(res) {
//     dogs = res;
//     console.log(dogs)
//   })
//   .catch(function(err) {
//     console.log(err)
//   })
