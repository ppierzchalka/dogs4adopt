const express = require('express'),
Dog = require('../models/dog'),
router = new express.Router()

// Sets search page url
router.get('/search', async function (req, res) {
    const variables = req.app.get('variables')
    try {
        const data = await Dog.find({"name": {
            "$regex": req.query['name'].toLowerCase(),
            "$options": "i"
        }})
        res.render('index.hbs', {
            pageTitle: 'Wyniki Wyszukiwania',
            pathToRender: 'search',
            menu: variables.menuPaths,
            shelters: variables.menuShelters,
            dogs: data
        });
    } catch (error) {
        console.log(error)
    }
});

module.exports = router