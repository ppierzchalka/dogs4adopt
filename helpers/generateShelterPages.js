const express = require('express'),
    Dog = require('../models/dog');

// Automatically generate shelter pages
function generateShelterPages(app, list, menuShelters, menuPaths) {
    list.forEach(shelter => {
        menuShelters.push({
            title: shelter,
            path: `/${encodeURIComponent(shelter)}`
        });
        app.get(`/${encodeURIComponent(shelter)}`, async (req, res) => {
            try {
                const data = await Dog.find({
                    location: shelter
                });
                res.render('index.hbs', {
                    pageTitle: `Schronisko ${shelter}`,
                    pathToRender: 'shelter',
                    menu: menuPaths,
                    shelters: menuShelters,
                    dogs: data
                });
            } catch(error) {
                console.log(error);
            }
        });
    });
}

module.exports = generateShelterPages