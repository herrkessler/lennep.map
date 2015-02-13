function initialize() {

var styles=[{featureType:"water",stylers:[{visibility:"on"},{color:"#b5cbe4"}]},{featureType:"landscape",stylers:[{color:"#efefef"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#83a5b0"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#bdcdd3"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#ffffff"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#e3eed3"}]},{featureType:"administrative",stylers:[{visibility:"on"},{lightness:33}]},{featureType:"road"},{featureType:"poi.park",elementType:"labels",stylers:[{visibility:"on"},{lightness:20}]},{},{featureType:"road",stylers:[{lightness:20}]},{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]}];

  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(51.192327, 7.257787399999984),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },
    mapTypeControl: false,
    streetViewControl: false
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  var geojson = {"type": "FeatureCollection","features": []};

  var infoWindow = new google.maps.InfoWindow();

  io.socket.get('/venue', function (data) {

    data.venues.forEach(function(venue){
      geojson.features.push({

        "type": "Feature", 
        "geometry": {
          "type": "Point",
          "coordinates": [
            parseFloat(venue.location.lng),
            parseFloat(venue.location.lat)
          ]},
          "properties": {
            "title": venue.title,
            "category": venue.venueCategories,
            "id": venue.id
        }
      });
    });

    map.data.addGeoJson(geojson);

    map.data.addListener('mouseover', function(data) {
      infoWindow.open(map);
      infoWindow.setContent('<div class="point-description">'+data.feature.k.title+'</div>');
      infoWindow.setPosition({lat: data.latLng.k, lng: data.latLng.D});
      infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -50)});
    });

    map.data.addListener('click', function(event) {
      var venueId = event.feature.k.id,
          host = window.location.host,
          newUrl = 'http://'+host+'/venue/show/'+venueId;
      window.location.assign(newUrl);
    });

  });

  // Get Position
  // -------------------------------

  var err = document.getElementById("map-error"),
      button = document.getElementById('whereami');

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      err.innerHTML = "Your browser doesn't support geolocation..";
    }
  }

  function showPosition(position) {
    var myLatlng = {lat: position.coords.latitude , lng: position.coords.longitude};
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"Hier bin Ii!"
    });
    marker.setIcon('http://maps.google.com/mapfiles/marker_yellow.png');
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        err.innerHTML = "Request for Geolocation denied by the user.";
        break;
      case error.POSITION_UNAVAILABLE:
        err.innerHTML = "Unavailable location information.";
        break;
      case error.TIMEOUT:
        err.innerHTML = "Location request timed out.";
        break;
      case error.UNKNOWN_ERROR:
        err.innerHTML = "UNKNOWN_ERROR.";
        break;
    }
  }

  button.onclick=function(event){
    event.preventDefault();
    getLocation();
  };

}

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyD6xOt7koXmNM3gaOll-yVyM4RTImT4LRY&sensor=true&callback=initialize";
  document.body.appendChild(script);
}

window.onload = loadScript;