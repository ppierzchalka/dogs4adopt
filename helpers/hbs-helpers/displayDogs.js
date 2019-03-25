module.exports.register = function(hbs) {
    hbs.registerHelper('displayDogs', function (dog) {
        return new hbs.SafeString(
            `<a href=${this.link} target="_blank">
    <h3 class="name">${this.name}</h3>
    <div class="img-crop">
    <img class="dog-img" src=${this.image} alt=${this.name} onerror="this.onerror=null;this.src='/images/noimage.png';"/>
    </div>
    <p class="location">Lokalizacja: ${this.location}</p>
    <button class="view">Zobacz</button>
    </a>`
        );
    });
}