from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from bson import ObjectId
from api_keys import user, pw

url = f"mongodb+srv://{user}:{pw}@atlascluster.hbnzjsz.mongodb.net/mydatabase?retryWrites=true&w=majority"

app = Flask(__name__)
app.config["MONGO_URI"] = url
mongo = PyMongo(app)

@app.route("/")
def welcome():
    
    return render_template('index.html')

# CORY
@app.route('/get_charge_stations', methods=['GET'])
def get_charge_stations():
    collection = mongo.db.us_charge_stations
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)

@app.route("/charge_stations")
def charge_stations():
    
    return render_template('map.html')


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
    
    return render_template('current_ev_prices.html')

@app.route('/get_avg_price_ev_new', methods=['GET'])
def get_avg_rice_ev_new():
    collection = mongo.db.avg_price_ev_new
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)

@app.route("/avg_price_ev_new")
def avg_price_ev_new():
    
    return render_template('avg_price_ev_new.html')

@app.route('/get_avg_gas_electric_prices', methods=['GET'])
def get_avg_gas_electric_prices():
    collection = mongo.db.avg_gas_electric_prices
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)

@app.route("/avg_gas_electric_prices")
def avg_gas_electric_prices():
    
    return render_template('avg_gas_electric_prices.html')

#LAUREN
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

@app.route("/vehicle_policy_col_test")
def vehicle_policy_col_test():
    
    return render_template('vehicle_policy_col_test.html')



#JUSTINE 
@app.route('/get_types_of_evs', methods=['GET'])
def get_data3():
    collection = mongo.db['Types of EVs by Brand by Year']
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)

@app.route("/types_of_evs")
def types_of_evs():
    
    return render_template('types_of_evs.html')

if __name__ == '__main__':
    app.run(debug=True)
    

    

