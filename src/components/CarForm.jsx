import React, { useState, useContext } from 'react';
import { firestore, storage } from '../Firebase';
import '../css/CarForm.css'
import axios from 'axios';
import { UserContext } from '../global/UserContext';


function CarForm() {

  const [carName, setCarName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useContext(UserContext);


  const handleCarNameChange = (event) => {
    setCarName(event.target.value);
  };

  // const handleFileSelect = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };
  const handleFileSelect = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const [formData, setFormData] = useState({
    Brand: '',
    Location: '',
    Fuel: '',
    Transmission: '',
    Year: '',
    Kms: '',
    Owner: '',
    Mileage: '',
    Engine: '',
    Power: '',
    Seats: '',
  });
  const [price, setPrice] = useState('');

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Upload image file to Firebase Storage
      const storageRef = storage.ref();
      const imageRef = storageRef.child(selectedFile.name);
      await imageRef.put(selectedFile);
    
      // Get the download URL of the uploaded image
      const imageUrl = await imageRef.getDownloadURL();
    
      // Store other form data in Firebase Firestore
      const docRef = await firestore.collection('products').add({
        carName,
        imageUrl,
        formData,
        userName: user.displayName,  // Add user name to the collection
        userEmail: user.email,
        // userId: user.userId
      });
    
      // Get the auto-generated document ID
      const docId = docRef.id;
    
      // Clear the form and display success message
      setCarName('');
      setSelectedFile(null);
      setFormData({
        Brand: '',
        Location: '',
        Fuel: '',
        Transmission: '',
        Year: '',
        Kms: '',
        Owner: '',
        Mileage: '',
        Engine: '',
        Power: '',
        Seats: '',
      });
      setSuccessMessage('Image uploaded successfully.');
      setErrorMessage('');
    
      // Make a request to the backend to compute the price
      const response = await axios.post('http://localhost:5000/predict', formData);
    
      // Update the price in the Firebase document
      await firestore.collection('products').doc(docId).update({
        price: response.data.price,
      });
    
      // Update the price and display success message
      setPrice(response.data.price);
      setSuccessMessage('Price updated successfully.');
    } catch (error) {
      setErrorMessage('An error occurred while uploading the image or updating the price.');
      setSuccessMessage('');
      console.error(error);
    }    
  };

  return (
    <div className='form_container'>
    <form onSubmit={handleSubmit} className="container mt-4">
        <div className="mb-3">
          <label htmlFor="carName" className="form-label">Car Name</label>
          <input type="text" className="form-control" id="carName" value={carName} onChange={handleCarNameChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image File</label>
          <input type="file" className="form-control" id="image" onChange={handleFileSelect} />
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Brand:
          </label>
          <select
            id="brand"
            name="Brand"
            value={formData.Brand}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Brand</option>
            <option value="AUDI">Audi</option>
            <option value="BENTLEY">Bentley</option>
            <option value="BMW">BMW</option>
            <option value="CHEVROLET">Chevrolet</option>
            <option value="DATSUN">Datsun</option>
            <option value="FIAT">Fiat</option>
            <option value="FORCE">Force</option>
            <option value="FORD">Ford</option>
            <option value="HONDA">Honda</option>
            <option value="HYUNDAI">Hyundai</option>
            <option value="ISUZU">Isuzu</option>
            <option value="JAGUAR">Jaguar</option>
            <option value="JEEP">Jeep</option>
            <option value="LAMBORGHINI">Lamborghini</option>
            <option value="LAND">Land</option>
            <option value="MAHINDRA">Mahindra</option>
            <option value="MARUTI">Maruti</option>
            <option value="MERCEDES">Mercedes</option>
            <option value="MINI">Mini</option>
            <option value="MITSUBISHI">Mitsubishi</option>
            <option value="NISSAN">Nissan</option>
            <option value="PORSCHE">Porsche</option>
            <option value="RENAULT">Renault</option>
            <option value="SKODA">Skoda</option>
            <option value="TATA">Tata</option>
            <option value="TOYOTA">Toyota</option>
            <option value="VOLKSWAGEN">Volkswagen</option>
            <option value="VOLVO">Volvo</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <select
            id="location"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Location</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Kochi">Kochi</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="fuel" className="form-label">
            Fuel:
          </label>
          <select
            id="fuel"
            name="Fuel"
            value={formData.Fuel}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Fuel Type</option>
            <option value="Diesel">Diesel</option>
            <option value="LPG">LPG</option>
            <option value="Petrol">Petrol</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="transmission" className="form-label">
            Transmission:
          </label>
          <select
            id="transmission"
            name="Transmission"
            value={formData.Transmission}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Transmission Type</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year of Manufacture:
          </label>
          <input
            type="number"
            id="year"
            name="Year"
            value={formData.Year}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="kms" className="form-label">
            Kilometres Driven:
          </label>
          <input
            type="number"
            id="kms"
            name="Kms"
            value={formData.Kms}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="owner" className="form-label">
            No of Owners:
          </label>
          <select
            id="owner"
            name="Owner"
            value={formData.Owner}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Owner Type</option>
            <option value="1">First</option>
            <option value="2">Second</option>
            <option value="3">Third</option>
            <option value="4">Fourth or More</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="mileage" className="form-label">
            Mileage (in kmpl):
          </label>
          <input
            type="number"
            id="mileage"
            name="Mileage"
            value={formData.Mileage}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="engine" className="form-label">
            Engine Capacity (in cc):
          </label>
          <input
            type="number"
            id="engine"
            name="Engine"
            value={formData.Engine}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="power" className="form-label">
            Power (in bhp):
          </label>
          <input
            type="number"
            id="power"
            name="Power"
            value={formData.Power}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="seats" className="form-label">
            No of Seats:
          </label>
          <input
            type="number"
            id="seats"
            name="Seats"
            value={formData.Seats}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      {price && <p className="mt-4">Price: {(price-1.5).toFixed(2)}</p>}
    </div>
  );
};

export default CarForm;