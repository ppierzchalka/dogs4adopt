// Automatically generate shelter pages
function generateShelterPages(app, list, menuShelters, menuPaths, data) {
    list.forEach(shelter => {
        menuShelters.push({
            title: shelter,
            path: `/${encodeURIComponent(shelter)}`
        });
        app.get(`/${encodeURIComponent(shelter)}`, (req, res) => {

            res.render('index.hbs', {
                pageTitle: `Schronisko ${shelter}`,
                pathToRender: 'shelter',
                menu: menuPaths,
                shelters: menuShelters,
                dogs: data.filter(dog => dog.location === shelter),
            });
        });
    });
}

module.exports = generateShelterPages