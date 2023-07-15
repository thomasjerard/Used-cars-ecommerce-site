import React from 'react'
// import Sidebar from './Sidebar'
import '../css/Sellcars.css'
import CarForm from '../components/CarForm'
import NavBar from '../components/NavBar'
import { useContext } from 'react'
import LoginPrompt from '../components/LoginPrompt'
import { UserContext } from '../global/UserContext'

function Sellcars() {
  const { user } = useContext(UserContext); // Access the authenticated user
  
  if(!user){
    return <LoginPrompt/>
  }

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