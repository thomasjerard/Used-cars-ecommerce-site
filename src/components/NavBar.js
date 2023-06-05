import {React,useContext} from 'react';
import { UserContext } from '../global/UserContext';
// import { Auth } from '../Firebase'; // Assuming you have a custom hook for accessing the authenticated user
import '../css/Navbar.css';

const Navbar = () => {
  const { user } = useContext(UserContext);; // Access the authenticated user

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* {user && (
          <div className="user-info">
            <div className="user-id">{user.displayName}</div>
            <div className="user-image">
              <img src={user.photoURL} alt="User" />
            </div>
          </div>
        )} */}
      </div>
      <div className="navbar-right">
      {user && (
          <div className="user-info">
            <div className="user-id">{user.displayName}</div>
            <div className="user-image">
              <img src={user.photoURL} alt="User" />
            </div>
          </div>
        )}
        {/* Add your other navbar elements here */}
      </div>
    </nav>
  );
};

export default Navbar;