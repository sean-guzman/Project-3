from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from bson import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://coryscar:Rutgers123!@atlascluster.hbnzjsz.mongodb.net/mydatabase?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route("/")
def welcome():
    
    return render_template('index-copy.html')

# CORY
@app.route('/charge_stations', methods=['GET'])
def get_charge_stations():
    collection = mongo.db.us_charge_stations
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)

# SEAN
@app.route('/get_ev_prices', methods=['GET'])
def get_ev_prices():
    collection = mongo.db.ev_prices
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)

@app.route("/current_ev_prices")
def current_ev_prices():
    
    return render_template('current-ev-prices.html')

@app.route('/get_avg_price_ev_new', methods=['GET'])
def get_avg_rice_ev_new():
    collection = mongo.db.avg_price_ev_new
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)

@app.route("/avg_price_ev_new")
def avg_price_ev_new():
    
    return render_template('avg-price-ev-new.html')

@app.route('/get_avg-gas-electric-prices', methods=['GET'])
def get_avg_gas_electric_prices():
    collection = mongo.db.avg_gas_electric_prices
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)

@app.route("/avg_gas_electric_prices")
def avg_gas_electric_prices():
    
    return render_template('avg-gas-electric-prices.html')

#LAUREN
@app.route('/get_incentive_data_col', methods=['GET'])
def get_incentive_data_col():
    collection = mongo.db.incentive_data_col
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)

@app.route("/incentive_data_col")
def incentive_data_col():
    
    return render_template('incentive_data_col.html')

@app.route('/get_vehicle_policy_col', methods=['GET'])
def get_vehicle_policy_col():
    collection = mongo.db.vehicle_policy_col
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)

@app.route("/vehicle_policy_col")
def vehicle_policy_col():
    
    return render_template('vehicle_policy_col.html')






#JUSTINE 
@app.route('/types_of_evs', methods=['GET'])
def get_data3():
    collection = mongo.db['Types of EVs by Brand by Year']
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)



if __name__ == '__main__':
    app.run(debug=True)
    

    

