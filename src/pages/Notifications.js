import React from "react";
import Sidebar from "../components/Sidebar";
import Mainbar from "../components/Mainbar";
import Tweets from "../components/Tweets";
import Noti from "../components/Noti";
function Notifications() {
  return (
    <div className="bg-black relative flex">
      <Sidebar />
      <Noti />
      <Tweets />
    </div>
  );
}

export default Notifications;
