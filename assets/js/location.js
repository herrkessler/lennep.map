// var err = document.getElementById("map-error"),
//     button = document.getElementById('whereami');

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition, showError);
//   } else {

//   }
// }

// function showPosition(position) {
//   var myLatlng = {lat: position.coords.latitude , lng: position.coords.longitude};
//   var marker = new google.maps.Marker({
//       position: myLatlng,
//       map: map,
//       title:"Hier bin Ii!"
//   });
// }

// function showError(error) {
//   switch (error.code) {
//     case error.PERMISSION_DENIED:
//       err.innerHTML = "Request for Geolocation denied by the user.";
//       break;
//     case error.POSITION_UNAVAILABLE:
//       err.innerHTML = "Unavailable location information.";
//       break;
//     case error.TIMEOUT:
//       err.innerHTML = "Location request timed out.";
//       break;
//     case error.UNKNOWN_ERROR:
//       err.innerHTML = "UNKNOWN_ERROR.";
//       break;
//   }
// }

// button.onclick=function(event){
//   event.preventDefault();
//   getLocation();
// };