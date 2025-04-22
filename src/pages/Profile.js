import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Tweets from "../components/Tweets";
import Pro from "../components/Pro";

function Profile() {
  return (
    <div className=" relative flex bg-black">
      <Sidebar  />
      <Pro />
      <Tweets />
    </div>
  );
}

export default Profile;
