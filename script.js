let map = L.map('map').setView( [40.32718 ,  -3.7635], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//añade geolocalizador//
L.Control.geocoder().addTo(map);

if (!navigator.geolocation) {
    console.log("Tu navegador no tiene Geolocalizacion!")
} else {
    /*setInterval(() => {*/
        navigator.geolocation.getCurrentPosition(getPosition)//la posicion de donde estes//
    /*}, 5000);*/
};

let marker, circulo, lat, long, precision;

function getPosition(position) {
	
    lat = position.coords.latitude
    long = position.coords.longitude
    precision = position.coords.accuracy

    L.Routing.control({
    
        waypoints: [
            L.latLng(lat, long),//usuario//
            L.latLng(40.3428166, -3.7512499)//destino
        ],
        language: 'es',
        routeWhileDragging: true //recalcular la ruta//
    }).addTo(map);

    const marcaOri = L.marker([lat, long]);//marcador usuario//
    circulo = L.circle([lat, long], { radius: precision })

    const marcaDest = L.marker([40.3428166, -3.7512499]);
    
    let grupoPuntos = L.featureGroup([marcaOri, marcaDest, circulo]).addTo(map);//añadir los tres puntos//
    map.fitBounds(grupoPuntos.getBounds());//zoom automatico//

    marcaDest.bindPopup("Venus Estilistas").openPopup();//marcador//

    console.log("Tus Coordenadas son: Lat: " + lat + " Long: " + long + " Precision: " + precision)
}




 






    



 