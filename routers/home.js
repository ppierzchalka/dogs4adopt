const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    const variables = req.app.get('variables')
    const data = req.app.get('data')
    res.render('index.hbs', {
        pageTitle: 'Dogs4dopt',
        pathToRender: 'homepage',
        menu: variables.menuPaths,
        shelters: variables.menuShelters,
        dogs: data.sort(() => .5 - Math.random()).slice(0, 4)
    });
});

module.exports = router