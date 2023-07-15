import '../css/style.scss'
import React from 'react'
import Sidebar1 from '../components/Sidebar1'
import Chat from '../components/Chat'
import Navbar from '../components/NavBar'
import { useContext } from 'react'
import LoginPrompt from '../components/LoginPrompt'
import { UserContext } from '../global/UserContext'

const ChatApp = () => {
  const { user } = useContext(UserContext); // Access the authenticated user
  
  if(!user){
    return <LoginPrompt/>
  }
  return (
    <div className='home'>
        <Navbar/>
      <div className="container">
        <Sidebar1/>
        <Chat/>
      </div>
    </div>
  )
}

export default ChatApp