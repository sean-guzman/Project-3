# Project 3

Rutgers Data Sciences Bootcamp, (13 June 2023)

- Lauren Golden, https://github.com/laurenhgolden
- Sean Guzman, https://github.com/sean-guzman
- Justine Owsik, https://github.com/jowsik
- Cory Scarnecchia, https://github.com/cscar43

With the rise in EVs/hybrid vehicles, we are curious how the infrastructure is adjusting with the market. We are also curious as to how government subsidies play a role in the expansion of EVs/hybrid sales and expansion. Through this project, we build a visualization showing in real-time the availability of charging stations around the country, and graphs representing the growth over time, the cost of gas versus electricity over time, and the cost of EVs compared to the overall market.

## Question:  Does it make sense to buy an electric car right now in the United States?
Prospective buyers of vehicles in the US should use this website.  The data includes information about the types of electric/hybrid vehicles being made by brand and prices of these vehicles, including tax credits.  A comparison of gas prices versus electricity prices to power these vehicles throughout the years is included.  You will see how many of these vehicles are on the road and how that compares to the total number of vehicles by state. Finally, included is a map of all the charging stations across the United States to show the accessibility across different parts of the country allowing you to zero in on your specific region. 

## Conclusion:  YES!
Based on the availability of electric/hybrid vehicles and charging stations, the price of powering these vehicles, and the current and projected popularity of these vehicles, it is evident that right now is a great time to buy an electric/hybrid vehicle.  

Why?
- Many models to choose from
- Significantly lower cost to power over gas-powered cars
- Very accessible charging stations (especially on the coasts)
- More people are buying these cars, forcing the infrastructure to adjust to this growth


## Data Sources

- [Alternative Fuels Data Center](https://afdc.energy.gov/data/10304)
- [Vehicle Registration Data](https://afdc.energy.gov/vehicle-registration)
- [AFDC Data Download](https://afdc.energy.gov/data_download/)
- [U.S. Energy Information Administration - Petroleum](https://www.eia.gov/petroleum/)
- [U.S. Energy Information Administration - Electricity](https://www.eia.gov/electricity/)
- [Average Price of an Electric Car](https://caredge.com/guides/average-price-of-an-electric-car)
- [Electric Car Prices in the U.S.](https://insideevs.com/news/565883/electric-car-prices-us/)
- [Open Charge Map API](https://api.openchargemap.io/v3/poi)


## Built With

- Python with Pandas
- Jupyter Notebook
- MongoDB
- HTML
- JavaScript
- API Flask
- Chart.js


## Installation

In order to correctly run our code, ensure you download PyMongo to correctly run the Jupyter notebooks. Python file, app.py, powers our our Flask and subsequent website. In order to properly run app.py, it calls another Python file, api_keys.py (not included in repository), which contains user and password credentials to log into our Mongo database to successfully access the data for this website.

## Tools and Sources

- Plotly
- JavaScript
- HTML
- D3.js
- JSON
- GitHub
- GitHub Pages
- console.log
- [ytdec GitHub repository](https://github.com/ytdec)

## Deployment

This project has been published using GitPages and can be accessed via https://sean-guzman.github.io/Project-3/MongoDBHtml/index.html
