import React from 'react';
import Sidebar from '../components/Sidebar';
import Products from '../components/Products';
import '../css/Buycars.css';
import NavBar from '../components/NavBar';
import FrontImage from '../components/FrontImage'

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