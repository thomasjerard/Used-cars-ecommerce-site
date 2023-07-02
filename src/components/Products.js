import React, { useEffect, useState, useContext } from 'react';
import { firestore } from '../Firebase';
import { ProductContext } from '../global/ProductContest';
import { useNavigate } from 'react-router-dom';
import '../css/Products.css';

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const {selectProduct} = useContext(ProductContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await firestore.collection('products').get();
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    // Implement your addToCart logic here
    selectProduct(product);
    navigate('/cardetails')

  };

  return (
    <div className="product-container">
      {products.length === 0 && <p>No products are available</p>}
      {products.map((product) => (
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
  );
}

export default Products;