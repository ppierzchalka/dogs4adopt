function initMap() {
    const mapElem = document.querySelector('#map');
    if (mapElem) {
        var map = new google.maps.Map(mapElem, {
            center: {
                lat: 51.919437,
                lng: 19.145136
            },
            zoom: 7,
            disableDefaultUI: true,
            styles: styles,
            gestureHandling: 'cooperative'
        });
    }
}