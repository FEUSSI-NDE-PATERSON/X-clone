import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Ex from "../components/Ex";
import Me from "../components/Me";
import Tweets from "../components/Tweets";

function Message() {
  
  return (
    <div className=" relative flex bg-black">
      <Sidebar  />
      <Me />
      <Tweets />
    </div>
  );
}

export default Message;
