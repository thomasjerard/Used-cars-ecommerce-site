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
    setRowActive();
  }, []);

  if (location.pathname === '/signin' || location.pathname === '/signup') {
    return null;
  }

  const signIn = () => {
    navigate('/signin');
  };

  const setRowActive = () => {
    const rows = document.getElementsByClassName('row');
    if (location.pathname === '/cardetails' || location.pathname === '/buycars') {
      if (rows.length >= 0) {
        rows[0].id = 'active';
        setActiveId(rows[0].id);
      }
    }else if (location.pathname === '/sellcars') {
      if (rows.length >= 1) {
        rows[1].id = 'active';
        setActiveId(rows[1].id);
      }
    }else if (location.pathname === '/messages') {
      if (rows.length >= 2) {
        rows[2].id = 'active';
        setActiveId(rows[2].id);
      }
    }else if (location.pathname === '/savedcars') {
      if (rows.length >= 3) {
        rows[3].id = 'active';
        setActiveId(rows[3].id);
    }}
    else if (location.pathname === '/profile') {
      if (rows.length >= 4) {
        rows[4].id = 'active';
        setActiveId(rows[4].id);
      }
    }
  };

  const handleButtonClick = (path) => {
    window.location.pathname = path;
    setRowActive();
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
