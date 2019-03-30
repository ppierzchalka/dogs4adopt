const express = require('express');
const Dog = require('../models/dog');
const router = new express.Router();

// Sets homepage url
router.get('/', async (req, res) => {
    const variables = req.app.get('variables')
    await Dog.findRandom({}, {}, {
        limit: 4
    }, function (error, results) {
        if (!error) {
            res.render('index.hbs', {
                pageTitle: 'Dogs4dopt',
                pathToRender: 'homepage',
                menu: variables.menuPaths,
                shelters: variables.menuShelters,
                dogs: results
            });
        }
    })
});

module.exports = router