from flask import Flask, request, render_template
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)  # Allow Cross-Origin Resource Sharing (CORS)

model = pickle.load(open('car.pkl', 'rb'))


@app.route("/predict", methods=["POST"])
def predict():
    # Car brands
    brands = [
        "AMBASSADOR", "AUDI", "BENTLEY", "BMW", "CHEVROLET", "DATSUN", "FIAT", "FORCE", "FORD", "HONDA",
        "HYUNDAI", "ISUZU", "JAGUAR", "JEEP", "LAMBORGHINI", "LAND", "MAHINDRA", "MARUTI", "MERCEDES",
        "MINI", "MITSUBISHI", "NISSAN", "PORSCHE", "RENAULT", "SKODA", "TATA", "TOYOTA", "VOLKSWAGEN",
        "VOLVO"
    ]

    # Locations
    locations = [
        "Ahmedabad", "Bangalore", "Chennai", "Pune", "Mumbai", "Coimbatore", "Hyderabad", "Jaipur",
        "Kochi", "Kolkata", "Delhi"
    ]

    # Fuel types
    fuels = ["Diesel", "LPG", "Petrol", "CNG"]

    # Transmission types
    transmissions = ["Manual"]

    if request.method == 'POST':
        # Extract form data
        brand = request.form['Brand']
        location = request.form['Location']
        fuel = request.form['Fuel']
        transmission = request.form['Transmission']
        year = float(request.form['Year'])
        kms = float(request.form['Kms'])
        owner = int(request.form['Owner'])
        mileage = float(request.form['Mileage'])
        engine = float(request.form['Engine'])
        power = float(request.form['Power'])
        seats = int(request.form['Seats'])

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

    return render_template("car.html")


if __name__ == "__main__":
    app.run(debug=True)
