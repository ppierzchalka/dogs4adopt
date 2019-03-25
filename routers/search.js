const express = require('express');
const router = new express.Router()

router.get('/search', function (req, res) {
    const variables = req.app.get('variables')
    const data = req.app.get('data')
    res.render('index.hbs', {
        pageTitle: 'Wyniki Wyszukiwania',
        pathToRender: 'search',
        menu: variables.menuPaths,
        shelters: variables.menuShelters,
        dogs: data.filter(item => item.name.toLowerCase().includes(req.query['name'].toLowerCase()))
    });
});

module.exports = router