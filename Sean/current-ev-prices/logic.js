const url = "https://us-east-1.aws.data.mongodb-api.com/app/data-qgrcp/endpoint/ev_prices";

var make = [];

var selector = d3.select("#selMake");
  
d3.json(url).then(function(data){

  console.log(data[0]);

  for (var i = 0; i < data.length; i++){
    
    var obj = data[i];

    if(!make.includes(obj.Make)){
      make.push(obj.Make)
    }


  
  };

  // console.log(make);

  make.forEach((item) => {
    selector.append("option").text(item).property("value", item);
  })

function createLineup(selected_make) {

  var models = [];
  var base_price = [];
  var effect_price = [];
  var tax_credit = [];

  for (var i = 0; i < data.length; i++){
    
    var obj = data[i];

    if(make.includes(selected_make)){
      models.push(obj.Model);
      base_price.push(obj['Base Price']);
      effect_price.push(obj['Effective Price']);
      tax_credit.push(obj['Tax Credit']);
    }

    console.log(models);


  
  };




};



//   // console.log(years);
//   const ctx = document.getElementById('myChart');

//   new Chart(ctx, {
//     type: 'line',
    
//     data: {
//       labels: years,
//       datasets: [
//         {label: 'Gas',
//         data: gas,
//         borderWidth: 1
//       },
//       {label: 'Electric',
//         data: electric,
//         borderWidth: 1
//       },
//     ]
//     },
    
//     options: {
//       interaction: {
//         mode: 'nearest',
//         axis: 'x',
//         intersect: false
//       },

//       plugins: {
//         title: {
//             display: true,
//             text: 'National Average Cost of Gas versus Electric (2001-2022)'
//         }
//       },
    
//       animations: {
//         tension: {
//           duration: 1000,
//           easing: 'linear',
//           from: 1,
//           to: 0,
//           loop: true
//         }
//       },
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });

});










