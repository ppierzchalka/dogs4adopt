const express = require('express'),
router = new express.Router()

// Sets map page url
router.get('/map', (req, res) => {
    const variables = req.app.get('variables')
    const data = req.app.get('data')
    res.render('index.hbs', {
        pageTitle: `Wszystkie zwierzęta`,
        pathToRender: 'map',
        menu: variables.menuPaths,
        shelters: variables.menuShelters,
        dogs: data,
    });
});

module.exports = router