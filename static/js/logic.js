// Use D3 library to read data
// Establish URL variable
const url = "https://us-east-1.aws.data.mongodb-api.com/app/data-qgrcp/endpoint/get_vehicle_policy_col"

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function createCharts(year) {

  // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
  
    // check if initial data set works for visualizations
    let chartVar = data
    let chartVar2 = chartVar.filter(newyear => newyear.year == year)
    let initialData = chartVar2[0]
  
    // Establish variables
    let ids = initialData.Policy_Count;
    let values = initialData.EV_Hybrid_Ratio;
    let labels = initialData
  
    // Create bubble chart
    let bubble = [
        {
        x: initialData.Gasoline,
        y: initialData.Electric_Hybrid_Vehicles_Total,
        text: initialData.data,
        mode: "markers",
        marker: {
            color: ids,
            colorscale: 'Earth',
            size: values
        }
    }];
  
    // Apply formatting to layout
    let bubbleLayout = {
        title: 'Hybrid/Electric Vehicles over Time',
        showlegend: true,
        height: 600,
        width: 1500
    };
  
    // Render the plot to the div tag with id "bubble"
    // Note that we use `traceData2` not `traceData`
    Plotly.newPlot("bubble", bubble, bubbleLayout);
    })
}

function init() {
// Grab a reference to the dropdown select element
    // Establish drop down menu with years
    let selector = d3.select("#selDataset");
    
    // Use the list of sample 'names' to populate the select options
    d3.json(url).then((data) => {
        
      // Filter for the correct year
        // var filteredData = data.filter(function(item) {
        // return item.Year.$numberInt === "2016";
        // });

        let sampleArray = data.Year;
        for (let i = 0; i < sampleArray.length; i++) {
            selector
            .append("option")
            .text(sampleArray[i])
            .property("value", sampleArray[i]);
        };

    // Use the first sample from the list to build the initial plots
    let firstSample = sampleArray[0];
    createCharts(firstSample);
  })
}

  function optionChanged(newSample){
    // Update all the plots when a new sample is selected
    createCharts(newSample);
    createMetadata(newSample)
}

init()