
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

curl -X POST -H "Content-Type: application/json" -d "{\"Brand\": \"AUDI\", \"Location\": \"Delhi\", \"Fuel\": \"Petrol\", \"Transmission\": \"Manual\", \"Year\": \"2022\", \"Kms\": \"5000\", \"Owner\": \"1\", \"Mileage\": \"12.5\", \"Engine\": \"1500\", \"Power\": \"120\", \"Seats\": \"5\"}" http://localhost:5000/predict
