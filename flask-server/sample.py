import pickle

model = open('car.pkl', 'rb')
regressor = pickle.load(model)

print("Give the following details:")
print("1. Year of Purchase")
print("2. Kms Driven")
print("3. No. of Owners")
print("4. Mileage")
print("5. Engine")
print("6. Power")
print("7. Seats")
print("8. Car Brand")
print("9. Location")
print("10. Fuel Type")
print("11. Transmission Type")


year = int(input())
kms = int(input())
owner = int(input())
mileage = float(input())
engine = int(input())
power = float(input())
seats = int(input())
brand = input()
location = input()
fuel = input()
transmission = input()

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
print(input_features)
# Perform prediction
Price = regressor.predict([input_features])[0]

print("The predicted price of the car is: ", Price)
