import React, { useContext, useEffect, useState } from 'react';
import '../css/Sidebar.css';
import { SidebarData } from './SidebarData';
import { FiLogOut } from 'react-icons/fi';
import { FiLogIn } from 'react-icons/fi';
import { UserContext } from '../global/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const { user, signOut } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    console.log("Location changed");
    const rows = document.getElementsByClassName('row');
    if(rows.length > 0){
    if (location.pathname === '/cardetails' || location.pathname === '/buycars') {
        rows[0].id = 'active';
        rows[1].id = '';
        rows[2].id = '';
        rows[3].id = '';
        rows[4].id = '';
        setActiveId(rows[0].id);
        setActiveId(rows[1].id);
        setActiveId(rows[2].id);
        setActiveId(rows[3].id);
        setActiveId(rows[4].id);
    }else if (location.pathname === '/sellcars') {
        rows[1].id = 'active';
        rows[0].id = '';
        rows[2].id = '';
        rows[3].id = '';
        rows[4].id = '';
        setActiveId(rows[0].id);
        setActiveId(rows[1].id);
        setActiveId(rows[2].id);
        setActiveId(rows[3].id);
        setActiveId(rows[4].id);
    }else if (location.pathname === '/messages') {
        rows[2].id = 'active';
        rows[0].id = '';
        rows[1].id = '';
        rows[3].id = '';
        rows[4].id = '';
        setActiveId(rows[0].id);
        setActiveId(rows[1].id);
        setActiveId(rows[2].id);
        setActiveId(rows[3].id);
        setActiveId(rows[4].id);
    }else if (location.pathname === '/savedcars') {
        rows[3].id = 'active';
        rows[0].id = '';
        rows[2].id = '';
        rows[1].id = '';
        rows[4].id = '';
        setActiveId(rows[0].id);
        setActiveId(rows[1].id);
        setActiveId(rows[2].id);
        setActiveId(rows[3].id);
        setActiveId(rows[4].id);
    }
    else if (location.pathname === '/profile') {
        rows[4].id = 'active';
        rows[0].id = '';
        rows[2].id = '';
        rows[3].id = '';
        rows[1].id = '';
        setActiveId(rows[0].id);
        setActiveId(rows[1].id);
        setActiveId(rows[2].id);
        setActiveId(rows[3].id);
        setActiveId(rows[4].id);
    }
  }
  }, [location]);

  if (location.pathname === '/signin' || location.pathname === '/signup') {
    return null;
  }

  const signIn = () => {
    navigate('/signin');
  };

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="Sidebar">
      <p className="Sidebar__Heading">
        <span className="up">Up</span>cars
      </p>
      <ul className="SidebarList">
        {SidebarData.map((val, key) => (
          <li
            key={key}
            className={`row ${window.location.pathname === val.path ? 'active' : ''}`}
            onClick={() => handleButtonClick(val.path)}
          >
            <div className="icon">{val.icon}</div>
            <div className="title">{val.title}</div>
          </li>
        ))}
      </ul>
      {user ? (
        <button className="logout-button">
          <FiLogOut className="logout-icon for-hover" />
          <span className="logout-text for-hover" onClick={signOut}>
            LOG OUT
          </span>
        </button>
      ) : (
        <button className="logout-button">
          <FiLogIn className="logout-icon for-hover" />
          <span className="logout-text for-hover" onClick={signIn}>
            LOG IN
          </span>
        </button>
      )}
    </div>
  );
}

export default Sidebar;
