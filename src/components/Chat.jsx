import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import wallpaper from '../img/wallpaper.jpg'


const Chat = () => {
  const { data } = useContext(ChatContext);
  const divStyle = {
    backgroundImage: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0)
      ),url(${wallpaper})`,
    backgroundSize: 'cover',
    // add more CSS properties as needed
  };  


  return (
    <div className="chat" style={divStyle}>
      <div className="chatInfo">
        <img src={data.user?.photoURL} alt="" />
        <span>{data.user?.displayName}</span>
        {/* <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div> */}
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
