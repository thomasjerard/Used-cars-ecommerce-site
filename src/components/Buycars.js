import React from 'react';
import Sidebar from './Sidebar';
import Products from './Products';
import '../css/Buycars.css';
import NavBar from './NavBar';
import FrontImage from './FrontImage'

function Buycars() {
  return (
    <div className='container1'>
        {/* <Sidebar/> */}
        <NavBar/>
        <FrontImage/>
        <div className='content__section'>
          <Products/>
        </div>
      </div>
  )
}

export default Buycars