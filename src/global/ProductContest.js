import React, { createContext, useState, useEffect, useContext } from 'react';
import { firestore } from '../Firebase';
import { UserContext } from '../global/UserContext';

// Create the context
export const ProductContext = createContext();

// Create the provider component
export const ProductProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [currentProduct, setCurrentProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);

  const addLikedProduct = async (product) => {
    const updatedLikedProducts = [...likedProducts, product];
    setLikedProducts(updatedLikedProducts);
    console.log('local list updated');

    try {
      await saveLikedProductsToDatabase(user.uid, updatedLikedProducts); // Save liked products to the database
      console.log('Liked product saved to the database successfully');
    } catch (error) {
      console.log('Error saving liked product to the database:', error);
    }
  };

  const removeLikedProduct = async (product) => {
    const updatedLikedProducts = likedProducts.filter((p) => p.id !== product.id);
    setLikedProducts(updatedLikedProducts);
    console.log('local list updated');

    try {
      await saveLikedProductsToDatabase(user.uid, updatedLikedProducts); // Save updated liked products to the database
      console.log('Updated liked products saved to the database successfully');
    } catch (error) {
      console.log('Error saving updated liked products to the database:', error);
    }
  };

  const selectProduct = (product) => {
    setCurrentProduct(product);
  };

  const saveLikedProductsToDatabase = async (userId, likedProducts) => {
    const userRef = firestore.collection('SavedCars').doc(userId);

    try {
      await userRef.update({ likedProducts }); // Update the likedProducts field in Firestore
    } catch (error) {
      console.log('Error updating user details:', error);
      throw error; // Re-throw the error to handle it further up the call stack if needed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userRef = firestore.collection('SavedCars').doc(user.uid);
        const snapshot = await userRef.get();
        if (snapshot.exists) {
          const userData = snapshot.data();
          if (userData && userData.likedProducts) {
            setLikedProducts(userData.likedProducts);
          }
        }
      }
    };

    fetchData();
  }, [user]);

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