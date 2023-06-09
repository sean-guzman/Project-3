from flask import Flask, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://coryscar:Rutgers123!@atlascluster.hbnzjsz.mongodb.net/mydatabase?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/charge_stations<br/>"
        f"/ev_prices<br/>"
        f"/types_of_evs"
    )

@app.route('/charge_stations', methods=['GET'])
def get_data():
    collection = mongo.db.us_charge_stations
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)

@app.route('/ev_prices', methods=['GET'])
def get_data2():
    collection = mongo.db.ev_prices
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)

@app.route('/types_of_evs', methods=['GET'])
def get_data3():
    collection = mongo.db['Types of EVs by Brand by Year']
    data = list(collection.find())

    for document in data:
        document['_id'] = str(document['_id'])

    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
    

    

