
const FH = [
  {name: "FH Joanneum", longitude: 15.409920, latitude: 47.069082 },
  {name: "FH Joanneum Kapfenberg", longitude: 15.331758, latitude: 47.453562 }
]

function initFHLocations(pos, map, directionsService, directionsDisplay) {
    for(var i = 0; i < FH.length; i++){
        marker = new google.maps.Marker({
          position: { lat: FH[i].latitude, lng: FH[i].longitude },
          map: map,
          icon: 'icons/city-hall.svg',
          title: FH[i].name,
        });

        marker.addListener('click', function(e) {
          direct(pos, directionsService, directionsDisplay, e.latLng);
        });
      }
}
