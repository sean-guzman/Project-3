const avg_price_ev_new_url = "http://127.0.0.1:5000/get_avg_price_ev_new";

var price_years = [];
var ev = [];
var new_car = [];


d3.json(avg_price_ev_new_url).then(function(data){

  for (var i = 0; i < data.length; i++){
    
    var obj = data[i];

    // PUSH EACH OBJECT'S TO RESPECTIVE ARRAY

    price_years.push(obj['Dates']);
    ev.push(obj['Average EV Price']);
    new_car.push(obj['New Car Average']);
  
  };

  // console.log(price_years);
  // console.log(ev);

  // GET HTML ELEMENT WHERE TO PLACE CHART

  const ctx = document.getElementById('avg_price_ev_new');

  let delayed;

  new Chart(ctx, {
    type: 'bar',
    
    data: {
      labels: price_years,
      datasets: [
        {label: 'ev',
        data: ev,
        borderWidth: 1
      },
      {label: 'new_car',
        data: new_car,
        borderWidth: 1
      },
    ]
    },
    
    options: {
      responsive: true,

      animation: {
        
        onComplete: () => {
          delayed: true;
        },

        delay: (context) => {
          let delay = 0;

          if(context.type === 'data' && context.mode === 'default' && !delayed){
            delay = context.dataIndex * 200 + context.datasetIndex * 20;
          }
          return delay;
        }
      },

      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },

      plugins: {
        title: {
            display: true,
            text: 'Average Cost of EVs versus New Cars (01/2020 - 03/2023)'
        }
      },

      scales: {
        x:{
          stacked:true
        },
        y: {
          stacked: false,
          beginAtZero: false
        }
      }
    }
  });

});










