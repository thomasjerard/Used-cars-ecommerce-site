import React from 'react'
// import Sidebar from './Sidebar'
import '../css/Sellcars.css'
import CarForm from './CarForm'
import NavBar from './NavBar'

function Sellcars() {
  return (
    <div className='container1'>
        {/* <Sidebar/> */}
        <NavBar/>
        <div className='content'>
          <CarForm/>
        </div>
    </div>
  )
}

export default Sellcars