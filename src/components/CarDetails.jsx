import {React,useContext} from 'react';
import '../css/CarDetails.css';
import NavBar from './NavBar';
import { ProductContext } from '../global/ProductContest';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


function CarDetails() {

  const navigate = useNavigate();

  const goBack = () => {
    navigate('/buycars');
  };

  const {currentProduct} = useContext(ProductContext);
  console.log(currentProduct);
  return (
    <div className='container_cardetails'>
      <NavBar/>
      <div className='back_button' onClick={goBack}>
        <h3><span><BsArrowLeft/></span>Car Details</h3>
      </div>
      <div className='cardetails'>
        <div className='left-container'>
          <div className="product-image"> 
                <img src={currentProduct.imageUrl} alt="Product" className="img-fluid" />
          </div>
          <div className='car_buttons'>
            <button type="submit" className="btn btn-primary save_btn">Save</button>
            <button type="submit" className="btn btn-primary msg_btn">Message</button>
          </div>
        </div>
        <div className='right-container'>
          <div className='content_cardetails'>
            <h1>{currentProduct.carName}</h1>
            <h2>Price: <span className='price'>{currentProduct.price}</span> Lakhs</h2>
          </div>
          <div className='content_specifications'>
            <h2>Specifications</h2>
            <div class="grid-container">
              <div class="grid-item">Brand: {currentProduct.formData.Brand}</div>
              <div class="grid-item">Engine: {currentProduct.formData.Engine} cc</div>
              <div class="grid-item">Fuel: {currentProduct.formData.Fuel }</div>
              <div class="grid-item">Kilometers: {currentProduct.formData.Kms }kms</div>
              <div class="grid-item">Location: {currentProduct.formData.Location}</div>
              <div class="grid-item">Mileage: {currentProduct.formData.Mileage} kmpl</div>
              <div class="grid-item">Owner: {currentProduct.formData.Owner}</div>
              <div class="grid-item">Power: {currentProduct.formData.Power} bhp</div>
              <div class="grid-item">Seats: {currentProduct.formData.Seats}</div>
              <div class="grid-item">Transmission: {currentProduct.formData.Transmission}</div>
              <div class="grid-item">Year: {currentProduct.formData.Year}</div>
              <div class="grid-item">Contact: {currentProduct.userEmail}</div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default CarDetails