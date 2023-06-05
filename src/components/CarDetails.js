import {React,useContext} from 'react';
import '../css/CarDetails.css';
import NavBar from './NavBar';
import { ProductContext } from '../global/ProductContest';




function CarDetails() {

  const {currentProduct} = useContext(ProductContext);
  console.log(currentProduct);
  return (
    <div className='container_cardetails'>
      <NavBar/>
      <div className='cardetails'>
        <div className='left-section'>
          <div className="product-image"> 
                <img src={currentProduct.imageUrl} alt="Product" className="img-fluid" />
          </div>
        </div>
        <div className='right-section'>
          <div className='content_cardetails'>
            <h3>Car Details</h3>
            <h1>{currentProduct.name}</h1>
            <h2>Price: {currentProduct.price}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetails