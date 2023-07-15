import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { ProductContext } from '../global/ProductContest';
import { UserContext } from '../global/UserContext';
import NavBar from '../components/NavBar';
import '../css/CarDetails.css';
import { firestore } from '../Firebase';

function CarDetails() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const {
    likedProducts,
    addLikedProduct,
    removeLikedProduct
  } = useContext(ProductContext);

  const [currentProduct, setCurrentProduct] = useState(null);
  
  const fetchCarData = async () => {
    try {
      const docRef = firestore.collection('products').doc(carId);
      const docSnapshot = await docRef.get();

      if (docSnapshot.exists) {
        const data = {id:carId,...docSnapshot.data(),};
        setCurrentProduct(data);
      } else {
        console.log('Car not found');
      }
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, [carId]);

  if (!currentProduct) {
    fetchCarData();
    return <div>Loading...</div>;
  }

  const goBack = () => {
    navigate('/buycars');
  };

  const gotoMsg = () => {
    navigate('/messages');
  };

  const addSaved = async () => {
    if (likedProducts.find(obj => obj.carName === currentProduct.carName)) {
      await removeLikedProduct(currentProduct);
    } else {
      await addLikedProduct(currentProduct);
    }
    console.log(likedProducts);
  };

  return (
    <div className='container_cardetails'>
      <NavBar />
      <div className='back_button' onClick={goBack}>
        <h3>
          <span>
            <BsArrowLeft />
          </span>
          Car Details
        </h3>
      </div>
      <div className='cardetails'>
        <div className='left-container'>
          <div className='product-image'>
            <img
              src={currentProduct.imageUrl}
              alt='Product'
              className='img-fluid'
            />
          </div>
          <div className='car_buttons'>
            <button
              type='submit'
              className='btn btn-primary save_btn'
              onClick={addSaved}
            >
              {user &&
              likedProducts.find(obj => obj.carName === currentProduct.carName)
                ? 'Saved'
                : 'Save'}
            </button>
            <button
              type='submit'
              onClick={gotoMsg}
              className='btn btn-primary msg_btn'
            >
              Message
            </button>
          </div>
        </div>
        <div className='right-container'>
          <div className='content_cardetails'>
            <h1>{currentProduct.carName}</h1>
            <h2>
              Price: <span className='price'>{(currentProduct.price - 1.5).toFixed(2)}</span> Lakhs
            </h2>
          </div>
          <div className='content_specifications'>
            <h2>Specifications</h2>
            <div className='grid-container'>
              <div className='grid-item'>Brand: {currentProduct.formData.Brand}</div>
              <div className='grid-item'>Engine: {currentProduct.formData.Engine} cc</div>
              <div className='grid-item'>Fuel: {currentProduct.formData.Fuel}</div>
              <div className='grid-item'>Kilometers: {currentProduct.formData.Kms}kms</div>
              <div className='grid-item'>Location: {currentProduct.formData.Location}</div>
              <div className='grid-item'>Mileage: {currentProduct.formData.Mileage} kmpl</div>
              <div className='grid-item'>Owner: {currentProduct.formData.Owner}</div>
              <div className='grid-item'>Power: {currentProduct.formData.Power} bhp</div>
              <div className='grid-item'>Seats: {currentProduct.formData.Seats}</div>
              <div className='grid-item'>Transmission: {currentProduct.formData.Transmission}</div>
              <div className='grid-item'>Year: {currentProduct.formData.Year}</div>
              <div className='grid-item'>Username: {currentProduct.userName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
