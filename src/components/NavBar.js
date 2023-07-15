import {React,useContext, useEffect} from 'react';
import { UserContext } from '../global/UserContext';
// import { Auth } from '../Firebase'; // Assuming you have a custom hook for accessing the authenticated user
import '../css/Navbar.css';

const Navbar = () => {
  const { user } = useContext(UserContext); // Access the authenticated user

  function MyComponent() {
    useEffect(() => {
      const navbar = document.querySelector('.navbar_container');
      if (navbar) {
        window.addEventListener('scroll', handleScroll);
      }
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    function handleScroll() {
      const navbar = document.querySelector('.navbar_container');
      if (navbar && window.scrollY > 0) {
        navbar.classList.add('scrolled');
      } else if (navbar) {
        navbar.classList.remove('scrolled');
      }
    }
  }

  if(user){
    MyComponent();
  }

  return (
    <div className='navbar_container'>
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
    </div>
  );
};

export default Navbar;