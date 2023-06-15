// Define the getColor function
function getColor(value) {
  // Color scale based on the value
  if (value >= 0 && value < 0.2) {
    return 'blue';
  } else if (value >= 0.2 && value < 0.4) {
    return 'green';
  } else if (value >= 0.4 && value < 0.6) {
    return 'yellow';
  } else if (value >= 0.6 && value < 0.8) {
    return 'orange';
  } else if (value >= 0.8 && value <= 1) {
    return 'red';
  } else {
    return 'purple';
  }
}

function createLegend() {
  // Create a legend control object that will be added to the map
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    // Create a div element with the "legend" class
    let div = L.DomUtil.create("div", "legend");

    // Define labels and colors for the legend
    let labels = ["0%", "20%", "40%", "60%", "80%", "100%"];
    let colors = ["blue", "green", "yellow", "orange", "red", "purple"];

    // Create legend labels and color blocks dynamically
    for (let i = 0; i < colors.length; i++) {
      let label = labels[i];
      let color = colors[i];

      // Create a legend item with a label and color block
      let legendItem = L.DomUtil.create("div", "legend-label");
      let colorBlock = L.DomUtil.create("div", "legend-color");
      colorBlock.style.backgroundColor = color;
      let labelSpan = L.DomUtil.create("span");
      labelSpan.textContent = label;

      // Append the label and color block to the legend item
      legendItem.appendChild(colorBlock);
      legendItem.appendChild(labelSpan);
      div.appendChild(legendItem);
    }

    return div; // Return the legend div
  };

  return legend; // Return the legend control object
}

function createMap(chargeStations, heatMapLayer, legend) {
  // Create a street map layer using OpenStreetMap tiles
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  });

  // Define base maps and overlay maps
  let baseMaps = {
    "Street Map": streetmap
  };

  let overlayMaps = {
    "Charge Stations": chargeStations,
    "Heat Map": heatMapLayer
  };

  // Create a Leaflet map object with specified options
  let map = L.map("map", {
    center: [39.8283, -98.5795], // Set the initial center of the map
    zoom: 5, // Set the initial zoom level of the map
    layers: [streetmap, chargeStations] // Set the initial layers of the map
  });

  // Add the legend control to the map and hide it by default
  legend.addTo(map);
  legend.getContainer().style.display = "none";

  // Add layer controls to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  // Add a control to toggle the legend
  let legendToggle = L.control({ position: "bottomright" });

  legendToggle.onAdd = function () {
    let div = L.DomUtil.create("div", "legend-toggle");

    // Create a button element
    let button = L.DomUtil.create("button");
    button.innerHTML = "Legend";

    // Add a click event listener to toggle the legend's display
    L.DomEvent.addListener(button, 'click', function () {
      let legendContainer = legend.getContainer();
      if (legendContainer.style.display === "none") {
        legendContainer.style.display = "block";
      } else {
        legendContainer.style.display = "none";
      }
    });

    div.appendChild(button); // Append the button to the div

    return div; // Return the div
  };

  legendToggle.addTo(map); // Add the legend toggle control to the map

  // Add a button to recenter the map
  let recenterBtn = L.control({ position: 'topright' });

  recenterBtn.onAdd = function () {
    let div = L.DomUtil.create('div', 'recenter-btn');
    div.innerHTML = '<button>Recenter Map</button>';

    // Add a click event listener to recenter the map
    div.firstChild.addEventListener('click', function () {
      map.setView([39.8283, -98.5795], 5);
    });
    return div; // Return the div
  };

  recenterBtn.addTo(map); // Add the recenter button control to the map

  // Add a button to geolocate user's location
  let locateBtn = L.control({ position: 'topright' });

  locateBtn.onAdd = function () {
    let div = L.DomUtil.create('div', 'locate-btn');
    div.innerHTML = '<button>Locate Me</button>';

    // Add a click event listener to locate the user
    div.firstChild.addEventListener('click', function () {
      map.locate({ setView: true, maxZoom: 16 }); // Locate the user's location and set the view to it
    });
    return div; // Return the div
  };

  locateBtn.addTo(map); // Add the locate button control to the map

  // Add an event listener for when the user's location is found
  map.on('locationfound', function (e) {
    map.setView(e.latlng, 12); // Zoom to the user's location with a zoom level of 12
  });
}

function createHeatMap(processedAPIData) {
  // Create a heat map layer using Leaflet.heat plugin
  let heatMapLayer = L.heatLayer(processedAPIData.map(function(d) {
    return d.Coordinates;
  }), {
    radius: 7,
    blur: 18,
    maxZoom: 8,
    gradient: {
      0.0: 'blue',
      0.2: 'green',
      0.4: 'yellow',
      0.6: 'orange',
      0.8: 'red',
      1.0: 'purple'
    }
  });

  return heatMapLayer; // Return the heat map layer
}

// Return back to the homepage
function goToIndex() {
  window.location.href = 'index.html';
}

// Fetch charge station data and create the map
d3.json("http://127.0.0.1:5000/static/json/us_charge_stations.json")
  .then(function(apiData) {
    let processedAPIData = apiData.map(function(d) {
      // Check and replace NaN values
      let county = isNaN(d.County) ? null : d.County;
      let latitude = isNaN(d.Latitude) ? null : +d.Latitude;
      let longitude = isNaN(d.Longitude) ? null : +d.Longitude;

      return {
        Title: d.Title,
        Usage_Type: d.Usage_Type,
        County: county,
        State: d.State,
        Country: d.Country,
        Coordinates: [latitude, longitude]
      };
    });

    console.log(processedAPIData);

    let chargeStations = new L.MarkerClusterGroup();

    processedAPIData.forEach(function(d) {
      let marker = L.marker(d.Coordinates)
      L.marker(d.Coordinates)
      .bindPopup(
        "<b>Title:</b> " + d.Title +
        "<br><b>Usage Type:</b> " + d.Usage_Type +
        "<br><b>County:</b> " + d.County +
        "<br><b>State:</b> " + d.State +
        "<br><b>Country:</b> " + d.Country
      )
        .addTo(chargeStations);
    });

    let heatMapLayer = createHeatMap(processedAPIData);
    let legend = createLegend();

    createMap(chargeStations, heatMapLayer, legend);
  })
  .catch(function(error) {
    console.log("Error loading data:", error);
  });