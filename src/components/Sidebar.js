import React from "react";
import Sides from "./Sides";
import { AccordionSummary, Menu } from "@mui/material";
import {
  Home,
  Message,
  More,
  NoteAlt,
  NotificationAdd,
  People,
  Person2,
  Search,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { toast } from "react-toastify";
function Sidebar() {
  const location = useLocation();
  const url = location.pathname;
  const nav = useNavigate();
  const LogOUt = () => {
    signOut(auth)
      .then((user) => {
        toast.success("Log out");
        nav("/login");
      })
      .catch((error) => {
        toast.error("Log Out not possible");
      });
  };
  return (
    <div className=" flex-[0.1] sm:flex-[0.6] flex flex-col  pl-5 ml-5 ">
      <div className="fixed left-0 sm:left-12 p-2 ">
        <div>
          <img
            src="../images/download.jpeg"
            className="h-8 w-8 text-left mt-8"
            alt="image not supported"
          />
        </div>
        <div className="mt-6 flex flex-col">
          {url === "/" ? (
            <Link to="/">
              <Sides active={true} Icons={<Home />} name="Home" />
            </Link>
          ) : (
            <Link to="/">
              <Sides Icons={<Home />} name="Home" />
            </Link>
          )}
          {url === "/Explore" ? (
            <Link to="/Explore">
              <Sides active={true} Icons={<Search />} name="Explore" />
            </Link>
          ) : (
            <Link to="/Explore">
              <Sides Icons={<Search />} name="Explore" />
            </Link>
          )}

          {url === "/Notifications" ? (
            <Link to="/Notifications">
              <Sides
                active={true}
                Icons={<NotificationAdd />}
                name="Notifications"
              />
            </Link>
          ) : (
            <Link to="/Notifications">
              <Sides Icons={<NotificationAdd />} name="Notifications" />
            </Link>
          )}
          {url === "/Message" ? (
            <Link to="/Message">
              <Sides active={true} Icons={<Message />} name="Message" />
            </Link>
          ) : (
            <Link to="/Message">
              <Sides Icons={<Message />} name="Message" />
            </Link>
          )}

          {url === "/grok" ? (
            <Link to="/grok">
              <Sides active={true} Icons={<NoteAlt />} name="Grok" />
            </Link>
          ) : (
            <Link to="/grok">
              <Sides Icons={<NoteAlt />} name="Grok" />
            </Link>
          )}
          <Sides Icons={<People />} name="Communities" />
          {url === "/profile" ? (
            <Link to="/profile">
              <Sides active={true} Icons={<Person2 />} name="Profile" />
            </Link>
          ) : (
            <Link to="/profile">
              <Sides Icons={<Person2 />} name="Profile" />
            </Link>
          )}
          <Sides Icons={<More />} name="More" />
          <p className="text-red-500" onClick={LogOUt}>
            Log out
          </p>
          <button className="text-white bg-[#1D9BF0] font-extrabold flex-1 p-3 rounded-full  my-3 hover:animate-bounce">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
