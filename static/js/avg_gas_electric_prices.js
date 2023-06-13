const avg_gas_electric_prices_url = "http://127.0.0.1:5000/get_avg_gas_electric_prices";

var years = [];
var gas = [];
var electric = [];

// FETCH DATA
d3.json(avg_gas_electric_prices_url).then(function(data){

  for (var i = 0; i < data.length; i++){
    
    var obj = data[i];

    // PUSH EACH OBJECT'S TO RESPECTIVE ARRAY

    years.push(obj['Year']);
    gas.push(obj['Gas Value']);
    electric.push(obj['Electric Value']);
  
  };

  // console.log(years);

  // GET HTML ELEMENT WHERE TO PLACE CHART
  const ctx = document.getElementById('avg_gas_electric');

  const chart = new Chart(ctx, {
    type: 'line',
    
    data: {
      labels: years,
      datasets: [
        {label: 'Gas',
        data: gas,
        borderWidth: 1
      },
      {label: 'Electric',
        data: electric,
        borderWidth: 1
      },
    ]
    },
    
    options: {
      responsive: true,
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },

      plugins: {
        title: {
            display: true,
            text: 'National Average Cost (USD) of Gas versus Electric (2001-2022)'
        }
      },
    
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }


  });


  

});










