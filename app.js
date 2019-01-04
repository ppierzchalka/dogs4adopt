const fs = require('fs');
const axios = require('axios');
const express = require('express');
const path = require("path");
const hbs = require('hbs');
const src = 'https://api.myjson.com/bins/1b1nn8';


const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '/public')));
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

var menuPaths = [{title: 'Home', path: '/'}, {title: 'About', path: '/about'}];

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Websited NodeJS Website',
    pathToRender : 'homepage',
    menu: menuPaths
  });
});

app.get('/about', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'About page',
    pathToRender: 'about',
    menu: menuPaths
  });
});

axios.get(src)
.then(res => res.data.posts.forEach(post => {
  menuPaths.push({title: `${post.title}`, path: `/${post.path}`});
  app.get(`/${post.path}`, (req, res) => {
    res.render('post.hbs', {
      pageTitle: post.title,
      content: post.content,
      menu: menuPaths
    })
  })
}));

app.listen(port, () => {console.log(`Server is up on port ${port}`)});
