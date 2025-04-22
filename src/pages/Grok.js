import React from "react";
import Sidebar from "../components/Sidebar";
import Gr from "../components/Gr";
import Tweets from "../components/Tweets";

function Grok() {
  return (
    <div className=" relative flex bg-black">
      <Sidebar />
      <Gr />
      <Tweets />
    </div>
  );
}

export default Grok;
