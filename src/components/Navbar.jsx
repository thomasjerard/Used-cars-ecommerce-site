import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../Firebase'
// import { AuthContext } from '../context/AuthContext'
import { UserContext } from '../global/UserContext';


const Navbar = () => {
  const {user} = useContext(UserContext)

  return (
    <div className='navbar'>
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img src={user.photoURL} alt="" />
        <span>{user.displayName}</span>
        <button onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar