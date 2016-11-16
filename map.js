// // More robust filtering (rnage/contains)
// // time and date comparsions
// // better UI (i.e. fields to modify what is shown)
// // more google maps api stuff

// // time -> 0-23: 59 000-059, 100-159 represents 12:00-12:59 AM
// // date -> format: mmddyyyy

// function date (day) {
//   day = day.split("/").map(Number);
//   day = new Date(day[2], day[0]-1, day[1])
//   // console.log(day)
//   return day;
// }

// function date_in_range (day, start, end) {
//   day = date(day);
//   start = date(start);
//   end = date(end);
//   // console.log((start <= day && day <= end))
//   return (start <= day && day <= end);
// }

// function date_contains (day, part, value) {
//   day = date(day);
//   if (part == "YEAR") {
//     return (day.getFullYear() == value);
//   }
//   else if (part == "MONTH") {
//     return (day.getMonth() == value);
//   }
//   else if (part == "DAY") {
//     return (day.getDate() == value);
//   }
// }

// // date("10/31/2016")
// // date_in_range("6/29/2016", "9/16/2016", "11/21/2016")

// function time_format (time) {
//   var num = parseInt(time.substring(0, time.length - 2).split(":").join(""))
//   if (time[time.length-2] == "P") {
//     if (num > 1200) {
//       num = num;
//     }
//     else {
//       num = num + 1200;
//     }
//   }
//   else if (time[time.length-2] == "A" && num >= 1200) {
//     num = num - 1200;
//   }
//   // console.log(num)
//   return num;
// }

// function time_in_range (time, start, end) {
//   time = time_format(time);
//   start = time_format(start);
//   end = time_format(end);
//   // console.log((start <= time && time <= end));
//   return (start <= time && time <= end);
// }

// function time_contains (time, part, value) {
//   // value -> 0-23 or 0-59
//   time = time_format(time);
//   if (part == "HOUR") {
//     return (value*100 < time && time < (value+1)*100)
//   }
//   if (part == "MINS") {
//     return (time%100 == value)
//   }
// }

// // time_in_range("1:01AM", "12:00PM", "2:10AM");


// //// Crime Data Loaded
// // http://eloquentjavascript.net/1st_edition/chapter14.html
// var request = new XMLHttpRequest();
// request.open("GET", "sample_data/large_powerful.txt", false);
// request.send(null);

// var crime_data = request.responseText;
// crime_data = crime_data.split("\n");

// for (i = 0; i < crime_data.length; i++) {
//   crime_data[i] = crime_data[i].split("\t");
// }

// crime_data_index = {};
// for (i = 0; i < crime_data[0].length; i++) {
//   crime_data_index[crime_data[0][i]] = i;
// }

// crime_data.shift();

// // console.log(crime_data);
// // console.log(crime_data_index);












// //// Crime Unique Locations
// function unique_locations_set (data) {
//   var unique_locations = new Set([]);
//   for (i = 0; i < data.length; i++) {
//     index = crime_data_index["Location"]
//     unique_locations.add(data[i][index]);
//   }

//   return Array.from(unique_locations);
//   // console.log(unique_locations);
// }










// //// Address Data Loaded
// var request2 = new XMLHttpRequest();
// request2.open("GET", "processed_data/address_data/cambridge_address.txt", false);
// request2.send(null);

// var address_data = request2.responseText;
// address_data = address_data.split("\n");

// for (i = 0; i < address_data.length; i++) {
//   address_data[i] = address_data[i].split(",");
//   address_data[i].shift();
//   address_data[i].shift();
//   address_data[i].shift();
//   address_data[i][1] = parseFloat(address_data[i][1]);
//   address_data[i][2] = parseFloat(address_data[i][2]);
// }

// // console.log(address_data)






// // sam -> move to flask
// // not stephen + daniel -> js query libraries
// // daniel -> front end
// // stephen -> use the google default route and tell them how "safe" it is






// //// Location -> LatLng for GMaps
// function LatLng (crime_row) {
//   var index = crime_data_index["Location"];
//   var location = crime_row[index];
//   for (i = 0; i < address_data.length; i++) {
//     if (address_data[i][0] == location.toUpperCase()) {
//       return new google.maps.LatLng(address_data[i][2], address_data[i][1]);
//     }
//   }
//   // return {lat: -42.374, lng: 71.117};
//   return new google.maps.LatLng(-42.374, 71.117);
// }


// function LatLng1 (location) {
//   for (i = 0; i < address_data.length; i++) {
//     if (address_data[i][0].toUpperCase() == location.toUpperCase()) {
//       return new google.maps.LatLng(address_data[i][2], address_data[i][1]);
//     }
//   }
//   // return {lat: -42.374, lng: 71.117};
//   return new google.maps.LatLng(-42.374, 71.117);
// }








  
// function filtering (column, filter) {
//   var data = [];
//   var index = crime_data_index[column];
//   for (i = 0; i < crime_data.length; i++) {
//     if (crime_data[i][index] == filter) {
//       data.push(crime_data[i]);
//     } 
//   }
//   return data;
// }

// // filter = '{"filter": [{"column": "name", "point": [point1, point2], "range": [(start,end)], "contains": [(part, value)]}]}'

// // &&& <= OR
// // ^^^ <= AND

// // var filter1 = '{"filter": [{"column": "Incident Type", "point": ["UNWANTED GUEST", "DEMONSTRATION"], "range": [], "contains": []}]}'

// // var filter2 = '{"filter": [{"column": "Date Occurred", "point": ["10/19/2016"], "range": [], "contains": []}]}'

// // var filter3 = '{"filter": [{"column": "Time Occurred", "point": ["10:45AM", "8:12PM"], "range": [], "contains": []}]}'

// // var filter4 = '{"filter": []}'

// // var filter5 = '{"filter": [{"column": "Incident Type", "point": ["THEFT"], "range": [], "contains": []}]}'

// // var filter6 = '{"filter": [{"column": "Incident Type", "point": ["THEFT"], "range": [], "contains": []}, {"column": "Time Occurred", "point": [], "range": [["9:28AM", "12:22PM"], ["8:00PM","10:00PM"]], "contains": []}]}'


// // function query (filter) {
// //   filter = JSON.parse(filter);
// //   filter = filter.filter;
// //   var filtered_data = new Set([]);
// //   if (filter.length == 0) {
// //     return crime_data;
// //   }
// //   for (i = 0; i < filter.length; i++) {
// //     index = crime_data_index[filter[i].column]

// //     // Point filter
// //     for (j = 0; j < filter[i].point.length; j++) {
// //       for (k = 0; k < crime_data.length; k++) {
// //         if (crime_data[k][index] == filter[i].point[j]) {
// //           filtered_data.add(crime_data[k]);
// //         }
// //       }
// //     }

// //     // Range filter (need to quantify range)
// //     for (j = 0; j < filter[i].range.length; j++) {
// //       for (k = 0; k < crime_data.length; k++) {
// //         if (filter[i].column == "Time Occurred" || filter[i].column == "Time Reported") {
// //           if (time_in_range(crime_data[k][index], filter[i].range[j][0], filter[i].range[j][1])) {
// //             filtered_data.add(crime_data[k]);
// //           }
// //         }
// //         if (filter[i].column == "Date Occurred" || filter[i].column == "Date Reported") {
// //           if (date_in_range(crime_data[k][index], filter[i].range[j][0], filter[i].range[j][1])) {
// //             filtered_data.add(crime_data[k]);
// //           }
// //         }
// //       }
// //     }


// //     // Contains filter (need to qualify contain function)
// //     for (j = 0; j < filter[i].contains.length; j++) {
// //       for (k = 0; k < crime_data.length; k++) {
// //         if (filter[i].column == "Time Occurred" || filter[i].column == "Time Reported") {
// //           if (time_in_contains(crime_data[k][index], filter[i].contains[j][0], filter[i].contains[j][1])) {
// //             filtered_data.add(crime_data[k]);
// //           }
// //         }
// //         if (filter[i].column == "Date Occurred" || filter[i].column == "Date Reported") {
// //           if (date_in_contains(crime_data[k][index], filter[i].contains[j][0], filter[i].contains[j][1])) {
// //             filtered_data.add(crime_data[k]);
// //           }
// //         }
// //       }
// //     }

// //   }


// //   filtered_data = Array.from(filtered_data);
// //   console.log(filtered_data);
// //   return filtered_data; 
// // }

// function query (filter) {
//   filter = JSON.parse(filter);
//   filter = filter.filter;
//   var filtered_data = JSON.parse(JSON.stringify(crime_data));
//   if (filter.length == 0) {
//     return filtered_data;
//   }
//   for (i = 0; i < filter.length; i++) {
//     var indices_to_remove = new Set([]);

//     index = crime_data_index[filter[i].column]

//     // Point filter
//     for (j = 0; j < filter[i].point.length; j++) {
//       for (k = 0; k < filtered_data.length; k++) {
//         if (filtered_data[k][index] == filter[i].point[j]) {
//           indices_to_remove.add(k);
//         }
//       }
//     }

//     // Range filter (need to quantify range)
//     for (j = 0; j < filter[i].range.length; j++) {
//       for (k = 0; k < filtered_data.length; k++) {
//         if (filter[i].column == "Time Occurred" || filter[i].column == "Time Reported") {
//           if ((time_in_range(filtered_data[k][index], filter[i].range[j][0], filter[i].range[j][1]))) {
//             indices_to_remove.add(k);
//           }
//         }
//         if (filter[i].column == "Date Occurred" || filter[i].column == "Date Reported") {
//           if ((date_in_range(filtered_data[k][index], filter[i].range[j][0], filter[i].range[j][1]))) {
//             indices_to_remove.add(k);
//           }
//         }
//       }
//     }


//     // Contains filter (need to qualify contain function)
//     for (j = 0; j < filter[i].contains.length; j++) {
//       for (k = 0; k < filtered_data.length; k++) {
//         if (filter[i].column == "Time Occurred" || filter[i].column == "Time Reported") {
//           if ((time_in_contains(filtered_data[k][index], filter[i].contains[j][0], filter[i].contains[j][1]))) {
//             indices_to_remove.add(k);
//           }
//         }
//         if (filter[i].column == "Date Occurred" || filter[i].column == "Date Reported") {
//           if ((date_in_contains(filtered_data[k][index], filter[i].contains[j][0], filter[i].contains[j][1]))) {
//             indices_to_remove.add(k);
//           }
//         }
//       }
//     }

//     var filtered_data_buffer = []
//     indices_to_remove = Array.from(indices_to_remove);
//     // console.log(indices_to_remove)
//     for (j = 0; j < indices_to_remove.length; j++) {
//       var item = filtered_data[indices_to_remove[j]];
//       filtered_data_buffer.push(item);
//     }
//     // console.log(filtered_data_buffer)
//     filtered_data = JSON.parse(JSON.stringify(filtered_data_buffer));
//     // console.log(filtered_data);
//   }


//   // filtered_data = Array.from(filtered_data);
//   console.log(filtered_data);
//   return filtered_data; 
// }
// // query(filter);

// // filter 1 -> 67 not 132
// // filter = '{"filter": [{"column": "name", "point": [point1, point2], "range": [(start,end)], "contains": [(part, value)]}]}'

// // &&& <= OR
// // ^^^ <= AND




// var filter1 = '{"filter": [{"column": "Incident Type", "point": ["UNWANTED GUEST", "DEMONSTRATION"], "range": [], "contains": []}]}'

// var filter2 = '{"filter": [{"column": "Date Occurred", "point": ["10/19/2016"], "range": [], "contains": []}]}'

// var filter3 = '{"filter": [{"column": "Time Occurred", "point": ["10:45AM", "8:12PM"], "range": [], "contains": []}]}'

// var filter4 = '{"filter": []}'

// var filter5 = '{"filter": [{"column": "Incident Type", "point": ["THEFT"], "range": [], "contains": []}]}'

// var filter6 = '{"filter": [{"column": "Incident Type", "point": ["THEFT"], "range": [], "contains": []}, {"column": "Time Occurred", "point": [], "range": [["9:28AM", "12:22PM"], ["8:00PM","10:00PM"]], "contains": []}]}'

// var filter7 = '{"filter": [{"column": "Incident Type", "point": ["THEFT"], "range": [], "contains": []}, {"column": "Time Occurred", "point": [], "range": [["8:00PM","11:59PM"], ["12:00AM","5:00AM"]], "contains": []}]}'

// // var markers = {};

// //// Map Generation
// // Initial Map: https://developers.google.com/maps/documentation/javascript/importing_data
// // Marker Cluster: https://developers.google.com/maps/documentation/javascript/marker-clustering
// var map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {    
//     zoom: 16,
//     center: {lat: 42.374, lng: -71.117},
//     mapTypeId: 'roadmap'
//   });

//   // var filter = (typeof filter !== 'undefined') ?  filter : filter4;
//   // var data = filtering("Incident Type", "UNWANTED GUEST");
//   var data = query(filter4)
//   // var data = crime_data;
//   // console.log(crime_data);
//   setMarkers(map, data);
// }

// // function setMarkers (map) {
// //   var markers = crime_data.map(function(crime_row) {
// //     return new google.maps.Marker({
// //       position: LatLng(crime_row),
// //       map: map,
// //       title: crime_row[crime_data_index["Incident Type"]]
// //     });
// //   });
// // }



// //// Windowed box
// // Example: https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
// // Example: http://jsfiddle.net/2crQ7/
// function setMarkers (map, data) {
//   var marker, i;
//   var unique_locations = unique_locations_set(data);
//   // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

//   for (i = 0; i < unique_locations.length; i++) {
//     var crimes = [];
//     var dummy = 0;
//     var index = crime_data_index["Location"];
//     for (j = 0; j < data.length; j++) {
//       if (data[j][index].toUpperCase() == unique_locations[i].toUpperCase()) {
//         crimes.push(data[j]);
//         dummy++;
//       }
//     }

//     var marker = new google.maps.Marker({
//       position: LatLng1(unique_locations[i]),
//       map: map,
//       icon: dummy1(dummy) 
//     });

//     var content = "";

//     for (j = 0; j < crimes.length; j++) {
//       // console.log(crimes[j][crime_data_index["Description"]])
//       content += 
//         "<div>" + crimes[j][crime_data_index["Description"]] + "</div>" +
//         "<div>" + crimes[j][crime_data_index["Date Occurred"]] + "</div>" +
//         "<div>" + crimes[j][crime_data_index["Time Occurred"]] + "</div>" +
//         "<div>" + crimes[j][crime_data_index["Incident Type"]] + "</div>"
//     }

//     var infowindow = new google.maps.InfoWindow();
//     google.maps.event.addListener(marker, 'click', (function(marker,content,infowindow){
//       return function () {
//         infowindow.setContent(content);
//         infowindow.open(map, marker);
//       };
//     })(marker,content,infowindow));

//     // markers[i] = marker;
//   }
//   // console.log(markers)
//   // dummy2(markers);
// }


// function dummy1(dummy) {
//   if (dummy > 1) {
//     return 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
//   }
// }

// // var lala;
// // function dummy2 (markers) {
// //   lala = markers;
// //   console.log(markers);
// // }

// // console.log(lala)
// // function delete_markers () {
// //   console.log(markers)
// // }
// // delete_markers()


// function test () {
//   var filter_query = document.getElementById('filter_query');
//   // console.log(JSON.parse(query.value))
//   map = new google.maps.Map(document.getElementById('map'), {    
//     zoom: 16,
//     center: {lat: 42.374, lng: -71.117},
//     mapTypeId: 'roadmap'
//   });
//   setMarkers(map, query(filter_query.value));
// }


//////////////\\\\\\\\\\\\\\\



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
          if ((time_in_contains(filtered_data[k][index], filter[i].contains[j][0], filter[i].contains[j][1]))) {
            indices_to_remove.add(k);
          }
        }
        if (filter[i].column == "Date Occurred" || filter[i].column == "Date Reported") {
          if ((date_in_contains(filtered_data[k][index], filter[i].contains[j][0], filter[i].contains[j][1]))) {
            indices_to_remove.add(k);
          }
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

var filter1 = '{"filter": []}';
var filter2 = '{"filter": [{"column": "Incident Type", "point": ["THEFT"], "range": [], "contains": []}]}'
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
var map;
var markers = [];

function initMap() {
  var Harvard = {lat: 42.374, lng: -71.117};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
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

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}



//// Date and Time Filter Pre-Req Functions
function date (day) {
  day = day.split("/").map(Number);
  day = new Date(day[2], day[0]-1, day[1])
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
    return (day.getMonth() == value);
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
    if (num > 1200) {
      num = num;
    }
    else {
      num = num + 1200;
    }
  }
  else if (time[time.length-2] == "A" && num >= 1200) {
    num = num - 1200;
  }
  // console.log(num)
  return num;
}

function time_in_range (time, start, end) {
  time = time_format(time);
  start = time_format(start);
  end = time_format(end);
  // console.log((start <= time && time <= end));
  return (start <= time && time <= end);
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