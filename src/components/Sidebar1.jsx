import React from "react";
import Search from "./Search"
import Chats from "./Chats"

const Sidebar1 = () => {
  return (
    <div className="sidebar">
    <div className="sidebarCenter">
    <Search/>
      <Chats/>
    </div>
    </div>
  );
};

export default Sidebar1;
