import '../css/style.scss'
import React from 'react'
import Sidebar1 from '../components/Sidebar1'
import Chat from '../components/Chat'
import Navbar from '../components/NavBar'

const ChatApp = () => {
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