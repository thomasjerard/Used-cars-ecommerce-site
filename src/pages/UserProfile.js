import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../global/UserContext';
import '../css/UserProfile.css';
import { auth, firestore, storage } from '../Firebase';
import NavBar from '../components/NavBar';
import LoginPrompt from '../components/LoginPrompt';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function UserProfile() {
  const { user } = useContext(UserContext); // Access the authenticated user  
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveData = async () => {
      if(user){
        try {
          const userRef = firestore.collection('users').doc(user.uid);
          const doc = await userRef.get();
          if (doc.exists) {
            const data = doc.data();
            console.log('Document data retrieved:', data);
            setUserName(data.name); // Set the 'name' value in the component state
          } else {
            console.log('No user document found');
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      }
    };
  }, []);

  const EditProfile = () => {
    navigate('/profile/profile-edit/'+user.uid);
  };

  if (!user) {
    return <LoginPrompt />;
  }

  return (
    <div className='container-userprofile'>
      <NavBar/>
      <div className="user-profile">

      {user && (
        <div>
          <div className='profile-header'>
            <div className='profile-img'>
              <img src={user.photoURL} alt="Profile" />
            </div>
            <div className='user-name'>
              <h2>{user.displayName}</h2>
            </div>
          </div>
          <div className='personal-info'>
            <h4>Personal Information</h4>
            <div className='info'>
              <p><span>Name:</span> {userName}</p>
              <p><span>Email:</span> {user.email}</p>
              <p><span>Phone:</span> {userEmail}</p>
              <p><span>Address:</span> {userAddress}</p>
            </div>
            <div className='edit-div'>
              <button className='edit-btn' onClick={() => EditProfile()}>
              <span className='icon'>
              <FaEdit/>
              </span>
              <span className='content-btn'>
                Edit
              </span>
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
}

export default UserProfile;