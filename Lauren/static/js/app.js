// Establish URL variable
const url = "https://us-east-1.aws.data.mongodb-api.com/app/data-qgrcp/endpoint/get_vehicle_policy_col"

// Establish function to create visualizations
function createCharts(selectedYear) {

// Fetch the JSON data and console log it
    d3.json(url).then(function(data) {

    // check if initial data set works for visualizations
    let chartVar = data
    let chartVar2 = chartVar.filter(obj => obj.Year.$numberInt === selectedYear)
    console.log("The data filtered by year is:")
    console.table(chartVar2)
    
    // Establish variables
    let ids = [];
    let ev_totals = [];
    let totals = [];
    let ratios = [];
    let labels = [];

    // Create a for loop to define the variables
    for (let i = 0; i < chartVar2.length; i++) {
        let id = chartVar2[i].State
        let ev_total = chartVar2[i].Electric_Hybrid_Vehicles_Total.$numberInt
        let total = chartVar2[i].Total_Vehicles.$numberInt
        let ratio = chartVar2[i].EV_Hybrid_Ratio.$numberDouble
        let label = chartVar2[i].Policy_Count.$numberDouble

        ids.push(id);
        ev_totals.push(ev_total);
        totals.push(total);
        ratios.push(ratio);
        labels.push(label);
    }
    // Create numerical labels for bubble chart
    let numericalLabels = labels.map(label => parseInt(label));

    // Combine the states and corresponding values into an array of objects
    let sorted_data = ev_totals.map((value, index) => ({ value: Number(value), index}));

    console.log(sorted_data)

    // Sort the data array in descending order based on the values
    sorted_data.sort((a, b) => b.value - a.value);

    // Extract the top 10 values and states for the bar graph
    let top_10_values = sorted_data.slice(0, 10).map(item => item.value);
    let top_10_indices = sorted_data.slice(0, 10).map(item => item.index);
    let top_10_states = top_10_indices.map(index => ids[index])

    console.log(top_10_values)

    // Create trace for horizontal bar graph
    let bar = [
        {
            x: top_10_values.reverse(),
            y: top_10_states.reverse(),
            text: labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }
    ];
    // Apply a title to the layout
    let barLayout = {
        title: 'Bar Chart of EV/Hybrid Vehicle Counts',
        xaxis: {
            title: 'Number of EV/Hybrid Vehicles'
        },
        yaxis: {
            title: 'Number of Total Vehicles'
        },
        showlegend: false,
        height: 400,
        width: 600
        };  

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", bar, barLayout);
    
    // Create bubble chart
    let bubble = [
        {
        x: totals,
        y: ev_totals,
        text: ids,
        mode: "markers",
        marker: {
            color: numericalLabels,
            colorscale: 'Rainbow',
            size: ratios,
            sizeref: .0003,
            opacity: .5
        },
        name: 'Bubble Chart',
        legendgroup: 'bubble'
    }];

    let colorbarData = [
        {
          x: [0, 1],
          y: [0, 1],
          type: 'heatmap',
          colorscale: 'Rainbow',
          showscale: true,
          colorbar: {
            title: 'Bubble Values',
            len: 0.5,
            y: 0.5,
            yanchor: 'middle'
          }
        }
      ];

    let bubbleData = bubble.concat(colorbarData);

    // Apply formatting to layout
    let bubbleLayout = {
        title: 'Bubble Chart of EV/Hybrid Vehicle Counts',
        xaxis: {
            range: [0, 12500000],
            title: 'Number of EV/Hybrid Vehicles'
        },
        yaxis: {
            range: [0, 200000],
            title: 'Number of Total Vehicles'
        },
        showlegend: true,
        showscale: true,
        legend: {
            x: 0,
            y: 1,
            bgcolor: 'white',
            bordercolor: 'purple',
            orientation: 'h',
            borderwidth: 10 ,
            traceorder: 'normal',
            itemsizing: 'constant',
            itemclick: true,
            itemdoubleclick: false,
            itemhover: true
            //traceorder: 'reversed',
            // title: {}
        },
        height: 800,
        width: 1200
    };

    // Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bubble", bubbleData, bubbleLayout).then(function(gd) {
        // Customize the legend labels
        let legend = gd.querySelector('.legend');
        let trace = gd.data[0];
        let gdlabels = trace.text || trace.hovertext;
        if (legend && gdlabels) {
          var items = legend.querySelectorAll('.traces > .legendtoggle');
          for (var i = 0; i < items.length; i++) {
            let item = items[i];
            let label = gdlabels[i] || '';
            let span = item.querySelector('span');
            if (span) {
              span.textContent = label;
            }
          }
        }
      });
    
    })
};

let x;

// Create function to initialize dashboard
function init() {
    // Grab a reference to the dropdown select element
    // Establish drop down menu with the years
        let selector = d3.select("#selDataset");
    
        // Use the list of sample 'names' to populate the select options
        d3.json(url).then((data) => {
        
        // Establish variable for data
        x = data;
            console.log(data);

            // Create blank array for list of years
            let years = [];
            
            // Create iteration to loop through the years and create an original list
            x.forEach(obj => {
                let year = obj.Year.$numberInt;
                if (!years.includes(year)) years.push(year);
            });

            // Append HTML code for the year within the dropdown menu
            years.forEach(year => {
                selector
                .append("option")
                .text(year);
            })
        // Use the first sample from the list to build the initial plots
        let firstYear = years[0]
        createCharts(firstYear);
    });

    // Adjust selector based on change
    selector.on("change", function() {
        let selectedYear = d3.event.target.value;
        createCharts(selectedYear)
    })
};

// Create function if the option is changed
function optionChanged(newSample){
    // Update all the plots when a new sample is selected
    createCharts();
}

// Initialize the dashboard
init();