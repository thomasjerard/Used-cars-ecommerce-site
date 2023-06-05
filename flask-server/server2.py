from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)  # Allow Cross-Origin Resource Sharing (CORS)

model = pickle.load(open('car.pkl', 'rb'))

# @app.route("/", methods=["GET", "POST"])
# def index():
#     if request.method == 'POST':
#         data = request.json  # Assuming you're sending JSON data
#         # Process the data
#         return jsonify({"message": "Received POST request successfully!"})

#     return jsonify({"message": "Received GET request successfully!"})


@app.route("/predict", methods=["POST", "GET"])
def predict():

    brands = [
        "AUDI", "BENTLEY", "BMW", "CHEVROLET", "DATSUN",
        "FIAT", "FORCE", "FORD", "HONDA", "HYUNDAI",
        "ISUZU", "JAGUAR", "JEEP", "LAMBORGHINI", "LAND",
        "MAHINDRA", "MARUTI", "MERCEDES", "MINI", "MITSUBISHI",
        "NISSAN", "PORSCHE", "RENAULT", "SKODA", "TATA",
        "TOYOTA", "VOLKSWAGEN", "VOLVO"
    ]

    # Locations
    locations = [
        "Bangalore", "Chennai", "Pune", "Mumbai", "Coimbatore",
        "Hyderabad", "Jaipur", "Kochi", "Kolkata", "Delhi"
    ]

    # Fuel types
    fuels = ["Diesel", "LPG", "Petrol"]

    # Transmission types
    transmissions = ["Manual"]

    if request.method == 'GET':
        return jsonify({"message": "Received GET request successfully!"})

    if request.method == 'POST':
        data = request.json

        # Extract data from JSON
        brand = data['Brand']
        location = data['Location']
        fuel = data['Fuel']
        transmission = data['Transmission']
        year = float(data['Year'])
        kms = float(data['Kms'])
        owner = int(data['Owner'])
        mileage = float(data['Mileage'])
        engine = float(data['Engine'])
        power = float(data['Power'])
        seats = int(data['Seats'])

        # Encode categorical variables
        brand_encoded = [int(brand == b) for b in brands]
        location_encoded = [int(location == l) for l in locations]
        fuel_encoded = [int(fuel == f) for f in fuels]
        transmission_encoded = [int(transmission == t) for t in transmissions]

        # Prepare input for prediction
        input_features = [
            year, kms, owner, mileage, engine, power, seats,
            *brand_encoded, *location_encoded, *fuel_encoded, *transmission_encoded
        ]

        # Perform prediction
        predicted_price = model.predict([input_features])[0]
        predicted_price = round(predicted_price, 2)

        # Prepare the response
        response = {
            "price": predicted_price
        }

        return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
