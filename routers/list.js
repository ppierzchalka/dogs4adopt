const express = require('express'),
router = new express.Router()

router.get('/all', (req, res) => {
    const variables = req.app.get('variables')
    const data = req.app.get('data')
    res.render('index.hbs', {
        pageTitle: `Wszystkie zwierzęta`,
        pathToRender: 'shelter',
        menu: variables.menuPaths,
        shelters: variables.menuShelters,
        dogs: data,
    });
});

module.exports = router