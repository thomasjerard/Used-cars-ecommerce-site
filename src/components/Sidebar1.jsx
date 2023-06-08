import React from "react";
import Navbar1 from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const Sidebar1 = () => {
  return (
    <div className="sidebar">
      <Navbar1 />
      <Search/>
      <Chats/>
    </div>
  );
};

export default Sidebar1;
