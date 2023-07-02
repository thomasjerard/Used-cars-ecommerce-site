import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { firestore } from "../Firebase";
import Message from "./Message";
import wallpaper from '../img/wallpaper.jpg'


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  const divStyle = {
    backgroundImage: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0)
      ),url(${wallpaper})`,
    backgroundSize: 'cover',
    // add more CSS properties as needed
  };  

  useEffect(() => {
    const unSub = onSnapshot(doc(firestore, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)

  return (
    <div className="messages" style={divStyle}>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
