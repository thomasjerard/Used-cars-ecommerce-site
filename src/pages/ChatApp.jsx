import React from 'react'
import Sidebar1 from '../components/Sidebar1'
import Chat from '../components/Chat'

const ChatApp = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar1/>
        <Chat/>
      </div>
    </div>
  )
}

export default ChatApp