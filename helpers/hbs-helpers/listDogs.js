module.exports.register = function(hbs) {
    hbs.registerHelper('listDogs', function (dog) {
        return new hbs.SafeString(
            `<div class="dog-elem" id="${this.name}" data-location=${this.dataLocation}>
    <img class="dog-img" src=${this.image} alt=${this.name} onerror="this.onerror=null;this.src='/images/noimage.png';"/>
    <h3 class="name">${this.name}</h3>
    <p class="location">Lokalizacja: ${this.location}</p>
    <a href=${this.link} target="_blank">Zobacz ogłoszenie</a>
    </div>`
            // <a href=${this.link} target="_blank">Zobacz</a>
        )
    });
}