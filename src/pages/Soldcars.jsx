import React from 'react'
import { ProductContext } from '../global/ProductContest'
import { UserContext } from '../global/UserContext';
import { useContext } from 'react';
import Navbar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css'
import LoginPrompt from '../components/LoginPrompt'

function Soldcars() {
  const { user } = useContext(UserContext); // Access the authenticated user
  console.log(user);
  const {likedProducts, selectProduct} = useContext(ProductContext);
  console.log(likedProducts);
  const navigate = useNavigate();

  if(!user){
    return <LoginPrompt/>
  }
  
  const addToCart = (product) => {
    // Implement your addToCart logic here
    selectProduct(product);
    navigate('/cardetails/' + product.id);

  };

  return (
    <div className='Dashboard-section'>
      <Navbar/>
      <div className='dashboard-container'>
        <h1>Sold Cars</h1>  
        <div className="product-container">
          {likedProducts.length === 0 && <p>No products are available</p>}
          {likedProducts.map((product) => (
          <div key={product.id} className="product-item" onClick={() => addToCart(product)}>
            <div className="product-image">
              <img src={product.imageUrl} alt="Product" className="img-fluid" />
            </div>
            <h3>{product.carName}</h3>
            <p>Price: {(product.price-1.5).toFixed(2)}</p>
            <button onClick={() => addToCart(product)} className="btn btn-primary">More Details</button>
            {/* <p>More Details</p> */}
          </div>
          ))}
        </div>
      </div>      
    </div>
  )
}

export default Soldcars