import React from "react";
import Sidebar from "../components/Sidebar";
import Mainbar from "../components/Mainbar";
import Tweets from "../components/Tweets";
function Main() {
  return (
    <div className="bg-black relative flex">
      <Sidebar />
      <Mainbar />
      <Tweets />
    </div>
  );
}

export default Main;
