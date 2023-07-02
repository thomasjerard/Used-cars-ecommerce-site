import React from 'react'
import { ProductContext } from '../global/ProductContest';
import { useContext } from 'react';
import Navbar from './NavBar';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css'

function Dashboard() {
  const {currentUser} = useContext(ProductContext);
  console.log(currentUser);
  const {likedProducts,selectProduct} = useContext(ProductContext);
  console.log(likedProducts);
  const navigate = useNavigate();
  
  const addToCart = (product) => {
    // Implement your addToCart logic here
    selectProduct(product);
    navigate('/cardetails')

  };

  return (
    <div className='Dashboard-section'>
      <Navbar/>
      <h1>Saved Cars</h1>  
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
  )
}

export default Dashboard