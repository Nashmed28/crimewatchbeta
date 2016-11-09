// sam
//// Crime Data Loaded
// http://eloquentjavascript.net/1st_edition/chapter14.html
var request = new XMLHttpRequest();
request.open("GET", "sample_data/small.txt", false);
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
    if (address_data[i][0].toUpperCase() == location.toUpperCase()) {
      return {lat: address_data[i][2], lng: address_data[i][1]};
    }
  }
  return {lat: -42.374, lng: 71.117};
}


//// Map Generation
// Initial Map: https://developers.google.com/maps/documentation/javascript/importing_data
// Marker Cluster: https://developers.google.com/maps/documentation/javascript/marker-clustering
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {    zoom: 16,
    center: {lat: 42.374, lng: -71.117},
    mapTypeId: 'roadmap'
  });

  var markers = crime_data.map(function(crime_row) {
    return new google.maps.Marker({
      position: LatLng(crime_row),
      map: map,
      title: crime_row[crime_data_index["Incident Type"]]
    });
  });
}
