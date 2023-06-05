import React, { createContext, useState, useEffect, useContext } from 'react';
import { database } from '../Firebase';
import { UserContext } from '../global/UserContext';

// Create the context
export const ProductContext = createContext();

// Create the provider component
export const ProductProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  // State for current product and liked products
  const [currentProduct, setCurrentProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    if (user && user.uid) {
      // Reference to the user details in the database
      const userDetailsRef = database.ref('userDetails').child(user.uid);

      // Function to add user details to the database
      const addUserDetails = (userId, likedProducts) => {
        userDetailsRef.set({
          userId,
          likedProducts
        })
          .then(() => {
            console.log('User details added successfully');
          })
          .catch((error) => {
            console.log('Error adding user details:', error);
          });
      };

      // Check if user details exist in the database
      userDetailsRef.once('value')
        .then((snapshot) => {
          const userDetails = snapshot.val();
          if (userDetails) {
            // User details exist, initialize the state with the existing values
            const { likedProducts } = userDetails;
            setLikedProducts(likedProducts);
          } else {
            // User details don't exist, create a new entry in the database
            addUserDetails(user.uid, []);
          }
        })
        .catch((error) => {
          console.log('Error retrieving user details:', error);
        });
    }
  }, [user]);

  // Function to add a product to the liked products
  const addLikedProduct = (product) => {
    setLikedProducts((prevLikedProducts) => [...prevLikedProducts, product]);
  };

  // Function to remove a product from the liked products
  const removeLikedProduct = (product) => {
    setLikedProducts((prevLikedProducts) =>
      prevLikedProducts.filter((p) => p.id !== product.id)
    );
  };

  // Function to set the currently selected product
  const selectProduct = (product) => {
    setCurrentProduct(product);
    // Store the selectedProduct value in localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  };

  useEffect(() => {
    // Retrieve the selectedProduct value from localStorage
    const storedProduct = localStorage.getItem('selectedProduct');
    if (storedProduct) {
      setCurrentProduct(JSON.parse(storedProduct));
    }
  }, []);

  // Value object to be passed to consumers of the context
  const value = {
    currentProduct,
    likedProducts,
    addLikedProduct,
    removeLikedProduct,
    selectProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};