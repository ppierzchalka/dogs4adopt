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

        const sheltersCoords = {
            lodz: {
                position: {
                    lat: 51.806990,
                    lng: 19.545330
                },
                name: 'Łódź',
            },
            dgorna: {
                position: {
                    lat: 51.239220,
                    lng: 15.187490
                },
                name: 'Dłużyna Górna'
            },
            jgora: {
                position: {
                    lat: 50.891810,
                    lng: 15.706170
                },
                name: 'Jelenia Góra'
            },
        };

        const listedDogs = [...document.querySelectorAll('.dog-elem')];

        const sortedDogs = listedDogs.reduce(function (obj, dog) {
            if (!obj[dog.dataset.location]) {
                obj[dog.dataset.location] = [];
            }
            obj[dog.dataset.location].push(dog);
            return obj;
        }, {});

        console.log(sortedDogs);

        let markers = [];

        Object.keys(sheltersCoords).forEach(key => {
            const marker = new google.maps.Marker({
                position: sheltersCoords[key].position,
                map: map,
                animation: google.maps.Animation.DROP,
                title: sheltersCoords[key].name,
                icon: `https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red${sortedDogs[key].length}.png`,
                id: key
            });
            const infowindow = new google.maps.InfoWindow({
                content: `Miejsce: ${sheltersCoords[key].name} - W tym schronisku jest ${sortedDogs[key].length} psów`
            });

            markers.push(marker);

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            })
        });
        
        let bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.position));
        map.fitBounds(bounds);

        listedDogs.forEach(function (elem) {
            elem.addEventListener('mouseenter', function () {
                markers.filter(marker => marker.id === elem.dataset.location)[0].setAnimation(google.maps.Animation.BOUNCE);
            })
            elem.addEventListener('mouseleave', function () {
                markers.filter(marker => marker.id === elem.dataset.location)[0].setAnimation(null);
            })

            elem.addEventListener('click', function () {
                markers.filter(marker => marker.id === elem.dataset.location)[0].setAnimation(google.maps.Animation.BOUNCE);
                  document.querySelector('#sidebar').classList.remove('map-sidebar-active');
                  document.querySelector('#sidebar-button').classList.remove('is-active');
            })
        })
    }
}