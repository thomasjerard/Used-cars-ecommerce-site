import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, firestore, storage } from '../Firebase';
import '../css/SignUp.css';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";


const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate('');

  const signUp = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg('');

    createUserWithEmailAndPassword(auth, email, password)
      .then( async (userCredential) => {
        const user = userCredential.user;

        // Update user profile
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            // Profile updated successfully

            // Save user data to Firestore
            const userRef = firestore.collection('users').doc(user.uid);
             userRef.set({
              displayName:username,
              email:email,
              username:username,
              uid:user.uid
            })
              .then(() => {
                // User data saved successfully

                // Get access token for the uploaded image
                storage
                  .ref('default-user-image.png') // Replace with the correct path to your uploaded image
                  .getDownloadURL()
                  .then((url) => {
                    // Update photo URL in Firebase Authentication
                    updateProfile(user, {
                      photoURL: url,
                    })
                      .then(() => {
                        // Photo URL updated successfully in Authentication

                        // Update photo URL in Firestore
                        userRef.update({
                          photoURL: url,
                        })
                          .then(() => {
                            setSuccessMsg('Registration successful. You can now sign in.');
                            navigate('/signin');
                          })
                          .catch((error) => {
                            setError('Error updating photo URL in Firestore. Please try again.');
                            console.log(error);
                          });
                      })
                      .catch((error) => {
                        setError('Error updating photo URL in Authentication. Please try again.');
                        console.log(error);
                      });
                  })
                  .catch((error) => {
                    setError('Error retrieving download URL. Please try again.');
                    console.log(error);
                  });
              })
              .catch((error) => {
                // Handle Firestore data saving errors
                setError('Error saving user data. Please try again.');
                console.log(error);
              });
          })
          .catch((error) => {
            // Handle any errors that occur during profile update
            setError('Error updating user profile. Please try again.');
            console.log(error);
          });
          //create empty user chats on firestore
          await setDoc(doc(firestore, "userChats", user.uid), {});
          navigate("/");
      })
      .catch((error) => {
        // Handle any errors that occur during user creation
        setError('Error creating user. Please try again.');
        console.log(error);
      });
  };

  return (
    <div className="box1-signUp">
      <div className="box-signUp">
        <span className="borderLine"></span>
        <form onSubmit={signUp}>
          <h2>Sign Up</h2>
          {/* {error && <p className="error">{error}</p>}
          {successMsg && <p className="success">{successMsg}</p>} */}
          <div className="inputBox">
            <input
              type="text"
              required="required"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span>Name</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="text"
              required="required"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>Username</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="email"
              required="required"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="password"
              required="required"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="links">
            <a href="/signin">Already have an account? Sign In</a>
          </div>
          <input type="submit" value="Submit" />
          {error && <p className="error">{error}</p>}
          {successMsg && <p className="success">{successMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
