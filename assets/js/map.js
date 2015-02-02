function initialize() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(51.192327, 7.257787399999984),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyD6xOt7koXmNM3gaOll-yVyM4RTImT4LRY&sensor=true&callback=initialize";
  document.body.appendChild(script);
}

window.onload = loadScript;