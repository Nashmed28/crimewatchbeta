//// Crime Data Loaded
// http://eloquentjavascript.net/1st_edition/chapter14.html
var request = new XMLHttpRequest();
request.open("GET", "sample_data/small_powerful.txt", false);
request.send(null);

var crime_data = request.responseText;
crime_data = crime_data.split("\n");

for (i = 0; i < crime_data.length; i++) {
  crime_data[i] = crime_data[i].split("\t");
}

crime_data_index = {};
for (i = 0; i < crime_data[0].length; i++) {
  crime_data_index[crime_data[0][i]] = i;
}

crime_data.shift();

// console.log(crime_data);
// console.log(crime_data_index);




//// Crime Unique Locations
function unique_locations_set (data) {
  var unique_locations = new Set([]);
  for (i = 0; i < data.length; i++) {
    index = crime_data_index["Location"]
    unique_locations.add(data[i][index]);
  }

  return Array.from(unique_locations);
  // console.log(unique_locations);
}




//// Address Data Loaded
var request2 = new XMLHttpRequest();
request2.open("GET", "processed_data/address_data/cambridge_address.txt", false);
request2.send(null);

var address_data = request2.responseText;
address_data = address_data.split("\n");

for (i = 0; i < address_data.length; i++) {
  address_data[i] = address_data[i].split(",");
  address_data[i].shift();
  address_data[i].shift();
  address_data[i].shift();
  address_data[i][1] = parseFloat(address_data[i][1]);
  address_data[i][2] = parseFloat(address_data[i][2]);
}

// console.log(address_data)









//// Location -> LatLng for GMaps
function LatLng (crime_row) {
  var index = crime_data_index["Location"];
  var location = crime_row[index];
  for (i = 0; i < address_data.length; i++) {
    if (address_data[i][0] == location.toUpperCase()) {
      return new google.maps.LatLng(address_data[i][2], address_data[i][1]);
    }
  }
  // return {lat: -42.374, lng: 71.117};
  return new google.maps.LatLng(-42.374, 71.117);
}


function LatLng1 (location) {
  for (i = 0; i < address_data.length; i++) {
    if (address_data[i][0].toUpperCase() == location.toUpperCase()) {
      return new google.maps.LatLng(address_data[i][2], address_data[i][1]);
    }
  }
  // return {lat: -42.374, lng: 71.117};
  return new google.maps.LatLng(-42.374, 71.117);
}


//// Map Generation
// Initial Map: https://developers.google.com/maps/documentation/javascript/importing_data
// Marker Cluster: https://developers.google.com/maps/documentation/javascript/marker-clustering
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {    
    zoom: 16,
    center: {lat: 42.374, lng: -71.117},
    mapTypeId: 'roadmap'
  });

  setMarkers(map, crime_data);
}

// function setMarkers (map) {
//   var markers = crime_data.map(function(crime_row) {
//     return new google.maps.Marker({
//       position: LatLng(crime_row),
//       map: map,
//       title: crime_row[crime_data_index["Incident Type"]]
//     });
//   });
// }




//// Windowed box
// Example: https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
// Example: http://jsfiddle.net/2crQ7/
function setMarkers (map, data) {
  var marker, i;
  var unique_locations = unique_locations_set(data);

  for (i = 0; i < unique_locations.length; i++) {
    var marker = new google.maps.Marker({
      position: LatLng1(unique_locations[i]),
      map: map,
      title: "HH" 
    });
  }
}