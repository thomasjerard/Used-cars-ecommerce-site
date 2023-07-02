import {React,useContext} from 'react';
import '../css/CarDetails.css';
import NavBar from './NavBar';
import { ProductContext } from '../global/ProductContest';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../global/UserContext';
import { firestore } from '../Firebase';



function CarDetails() {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { 
    likedProducts,
    addLikedProduct,
    removeLikedProduct
    } = useContext(ProductContext);

  const goBack = () => {
    navigate('/buycars');
  };

  const gotoMsg = () =>{
    navigate('/messages')
  }

  const addSaved = async () => {
    if(document.querySelector('.save_btn').innerHTML === 'Save'){
      await addLikedProduct(currentProduct);
    }else{
      await removeLikedProduct(currentProduct);
    }
    console.log(likedProducts);
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
            <button type="submit" className="btn btn-primary save_btn" onClick={addSaved}>{(user && likedProducts.find(obj => obj.carName === currentProduct.carName)) ? "Saved" : "Save"}</button>
            <button type="submit" onClick={gotoMsg} className="btn btn-primary msg_btn">Message</button>
          </div>
        </div>
        <div className='right-container'>
          <div className='content_cardetails'>
            <h1>{currentProduct.carName}</h1>
            <h2>Price: <span className='price'>{(currentProduct.price - 1.5).toFixed(2)}</span> Lakhs</h2>
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
              <div class="grid-item">Username: {currentProduct.userName}</div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default CarDetails