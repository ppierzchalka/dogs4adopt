const express = require('express');
const router = new express.Router();

router.get('/about', (req, res) => {
    const variables = req.app.get('variables');
    res.render('index.hbs', {
        pageTitle: 'Informacje',
        pathToRender: 'about',
        menu: variables.menuPaths,
        shelters: variables.menuShelters
    });
});

module.exports = router