//// Crime Data Loaded
// http://eloquentjavascript.net/1st_edition/chapter14.html
var request = new XMLHttpRequest();
request.open("GET", "sample_data/large_powerful.txt", false);
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

//// Query Function
function query (filter) {
  filter = JSON.parse(filter);
  filter = filter.filter;
  var filtered_data = JSON.parse(JSON.stringify(crime_data));
  if (filter.length == 0) {
    return filtered_data;
  }
  for (i = 0; i < filter.length; i++) {
    var indices_to_remove = new Set([]);

    index = crime_data_index[filter[i].column]

    // Point filter
    for (j = 0; j < filter[i].point.length; j++) {
      for (k = 0; k < filtered_data.length; k++) {
        if (filtered_data[k][index] == filter[i].point[j]) {
          indices_to_remove.add(k);
        }
      }
    }

    // Range filter (need to quantify range)
    for (j = 0; j < filter[i].range.length; j++) {
      for (k = 0; k < filtered_data.length; k++) {
        if (filter[i].column == "Time Occurred" || filter[i].column == "Time Reported") {
          if ((time_in_range(filtered_data[k][index], filter[i].range[j][0], filter[i].range[j][1]))) {
            indices_to_remove.add(k);
          }
        }
        if (filter[i].column == "Date Occurred" || filter[i].column == "Date Reported") {
          if ((date_in_range(filtered_data[k][index], filter[i].range[j][0], filter[i].range[j][1]))) {
            indices_to_remove.add(k);
          }
        }
      }
    }


    // Contains filter (need to qualify contain function)
    for (j = 0; j < filter[i].contains.length; j++) {
      for (k = 0; k < filtered_data.length; k++) {
        if (filter[i].column == "Time Occurred" || filter[i].column == "Time Reported") {
          if ((time_contains(filtered_data[k][index], filter[i].contains[j][0], filter[i].contains[j][1]))) {
            indices_to_remove.add(k);
          }
        }
        if (filter[i].column == "Date Occurred" || filter[i].column == "Date Reported") {
          if ((date_contains(filtered_data[k][index], filter[i].contains[j][0], filter[i].contains[j][1]))) {
            indices_to_remove.add(k);
          }
        }
        if (filter[i].contains[j][0] == "TEXT" && filtered_data[k][index].includes(filter[i].contains[j][1])) {
          indices_to_remove.add(k);
        }
      }
    }

    var filtered_data_buffer = []
    indices_to_remove = Array.from(indices_to_remove);
    // console.log(indices_to_remove)
    for (j = 0; j < indices_to_remove.length; j++) {
      var item = filtered_data[indices_to_remove[j]];
      filtered_data_buffer.push(item);
    }
    // console.log(filtered_data_buffer)
    filtered_data = JSON.parse(JSON.stringify(filtered_data_buffer));
  }
  return filtered_data;
}

//// FILTERS
// var filter = '{"filter": [{"column": "name", "point": [point1, point2], "range": [[start,end], [start, end]], "contains": [[part, value]]}]}'
var filter1 = '{"filter": []}';
var filter2 = '{"filter": [{"column": "Incident Type", "point": ["UNWANTED GUEST"], "range": [], "contains": []}]}'
// console.log(query(filter2));

//// Converts place address to Coordinates
function LatLng (location) {
  for (i = 0; i < address_data.length; i++) {
    if (address_data[i][0].toUpperCase() == location.toUpperCase()) {
      return new google.maps.LatLng(address_data[i][2], address_data[i][1]);
    }
  }
  // return {lat: -42.374, lng: 71.117};
  return new google.maps.LatLng(-42.374, 71.117);
}

//// Crime Unique Locations
function unique_locations_set (data) {
  var unique_locations = {};
  for (i = 0; i < data.length; i++) {
    index = crime_data_index["Location"]
    if (unique_locations[data[i][index]] == undefined) {
      unique_locations[data[i][index]] = [data[i]];
    }
    else {
      unique_locations[data[i][index]].push(data[i]);
    }
  }

  return unique_locations;
}

// Generates content for markers
function content (location) {
  var content = "<h3>Crimes:</h3>";

  for (i = 0; i < location.length; i++) {
    content += 
      "<div>" + location[i][crime_data_index["Description"]] + "</div>" +
      "<div>" + location[i][crime_data_index["Date Occurred"]] + "</div>" +
      "<div>" + location[i][crime_data_index["Time Occurred"]] + "</div>" +
      "<div>" + location[i][crime_data_index["Incident Type"]] + "</div>" +
      "<br>";
  }

  return content;
}

// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
// Source: https://jsfiddle.net/api/post/library/pure/
var map;
var markers = [];
var markerCluster;

function initMap() {
  var Harvard = {lat: 42.374, lng: -71.117};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: Harvard,
    mapTypeId: 'roadmap'
  });

  // This event listener will call addMarker() when the map is clicked.
  // map.addListener('click', function(event) {
  //   addMarker(event.latLng);
  // });

  // Adds a marker at the center of the map.
  // addMarker(Harvard);

  // Adds markers from the dataset
  var data = unique_locations_set(query(filter1));
  addSetMarkers(data);
}

// Adds a marker to the map and push to the array.
function addMarker(location) {  
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Adds markers from a set of locations
function addSetMarkers(data) {
  var locations = Object.keys(data);
  var marker, i;
  for (i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      position: LatLng(locations[i]),
      map: map
    }); 
    markers.push(marker);

    info(marker, i, data[locations[i]]);
  }
}

// Creates infowindows for each marker
function info (marker, i, location) {
  var infowindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.setContent(content(location));
      infowindow.open(map, marker);
    }
  })(marker, i));
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Creates marker clusters
function createCluster (zoom) {
  var zoom = (typeof zoom !== 'undefined') ?  zoom : 15;
  if (markerCluster == undefined || markerCluster["markers_"].length == 0) {
    markerCluster = new MarkerClusterer(map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      maxZoom: zoom
    });
  }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}



//// Date and Time Filter Pre-Req Functions
function date (day) {
  day = day.split("/").map(Number);
  day = new Date(day[2]+2000, day[0]-1, day[1])
  // console.log(day)
  return day;
}

function date_in_range (day, start, end) {
  day = date(day);
  start = date(start);
  end = date(end);
  // console.log((start <= day && day <= end))
  return (start <= day && day <= end);
}

function date_contains (day, part, value) {
  day = date(day);
  if (part == "YEAR") {
    return (day.getFullYear() == value);
  }
  else if (part == "MONTH") {
    return (day.getMonth() == value - 1);
  }
  else if (part == "DAY") {
    return (day.getDate() == value);
  }
}

// date("10/31/2016")
// date_in_range("6/29/2016", "9/16/2016", "11/21/2016")

function time_format (time) {
  var num = parseInt(time.substring(0, time.length - 2).split(":").join(""))
  if (time[time.length-2] == "P") {
    if (num >= 1200) {
      num = num;
    }
    else {
      num = num + 1200;
    }
  }
  else if (time[time.length-2] == "A" && num >= 1200) {
    num = num - 1200;
  }
  console.log(num)
  return num;
}

function time_in_range (time, start, end) {
  time = time_format(time);
  start = time_format(start);
  end = time_format(end);
  if (start <= end) {
    return (start <= time && time <= end);
  }
  else {
    return (start <= time || time <= end);
  }
  // console.log((start <= time && time <= end));
  // return (start <= time && time <= end);
}

function time_contains (time, part, value) {
  // value -> 0-23 or 0-59
  time = time_format(time);
  if (part == "HOUR") {
    return (value*100 < time && time < (value+1)*100)
  }
  if (part == "MINS") {
    return (time%100 == value)
  }
}



//// Clustering Code

// Activates the feature
function clusterActivate (zoom) {
  var zoom = (typeof zoom !== 'undefined') ?  zoom : document.getElementById("cluster_zoom").value;
  if (markerCluster != undefined && markerCluster["maxZoom_"] != zoom) {
    clusterDeactivate();
  }
  createCluster(zoom);
}

// Deactivate the feature
function clusterDeactivate () {
  if (markerCluster != undefined && markerCluster["markers_"].length > 0) {
    markerCluster.clearMarkers();
    showMarkers();
  }
}

// Activate cluster at the current zoom level
function clusterActivate_CurrentLevel () {
  var zoom = map["zoom"];
  clusterActivate(zoom);
}

//// UI work for the filter option

// Calls all HTML generating JS function
function form () {
  column_select(1);
}

// Make list of columns to select from
function column_select (n) {
  var html = "<option id='default_" + n + "' value=''>---</option>";
  var options = Object.keys(crime_data_index);
  for (i = 0; i < options.length; i++) {
    html += "<option id='" + options[i] + "_" + n + "' value='" + options[i] + "'>" + options[i] + "</option>";
  }
  $("#filter" + n + "_column").append(html);
}

// Add another row for filtering
var filter_row = 1;
function addrow() {
  var n = filter_row + 1;
  var html =
  "<div id='filter" + n + "'>" +
    "Type: " + 
    "<select id='filter" + n + "_column'></select> " +
    "Values: <input id='filter" + n + "_point' type='text'> " +
    "Ranges: <input id='filter" + n + "_range' type='text'> " +
    "Contains: <input id='filter" + n + "_contains' type='text'> " + 
    "<input id='removerow" + n + "' type='submit' value='Remove Row' onclick='removerow(" + n + ")'>" +
    "<br>" + 
  "</div>";
  $("#filter").append(html);
  column_select(n);
  filter_row++;     
}

// Removes the row
function removerow (n) {
  $("#filter" + n).remove();
}

// Makes changes to the map accordingly
function search (filter) {
  var filter = (typeof filter !== 'undefined') ?  filter : generate_filter();
  var cluster_active = markerCluster != undefined && markerCluster["markers_"].length > 0;
  clusterDeactivate();
  deleteMarkers();
  var data = unique_locations_set(query(filter));
  addSetMarkers(data);
  if (cluster_active) {
    clusterActivate(markerCluster["maxZoom_"]);
  }
}

// Takes inputs and converts to filter JSON format
function generate_filter () {
  var filter = '{"filter": [';
  for (i = 1; i <= filter_row; i++) {
    if (document.getElementById("filter" + i) !== null) {
      var column = document.getElementById("filter" + i + "_column").value;
      var point = document.getElementById("filter" + i + "_point").value;
      var range = document.getElementById("filter" + i + "_range").value;
      var contains = document.getElementById("filter" + i + "_contains").value;

      filter += '{"column": "' + column + '", "point": [' + point + '], "range": [' + range + '], "contains": [' + contains + ']},';
    }
  }
  filter = filter.slice(0,-1);
  filter += ']}';
  console.log(filter);
  return filter;
}

// Resets to show all data points
function reset () {
  clusterDeactivate(); 
  var filter = '{"filter": []}';
  search (filter);
}

var stat1;
var stat2;
function store (i) {
  if (i == 1) {
    stat1 = [markers, markerCluster];
  }
  else {
    stat2 = [markers, markerCluster];
  }
}

function toggle (i) {
  var stat;
  if (i == 1) {
    stat = stat1;
  }
  else {
    stat = stat2;
  }
  clusterDeactivate();
  deleteMarkers();
  markers = stat[0];
  markerCluster = stat[1];
  showMarkers();
}

