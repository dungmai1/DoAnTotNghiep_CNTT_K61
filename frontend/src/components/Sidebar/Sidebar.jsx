import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { UserContext } from "../../context/UserContext";
export default function Sidebar() {
  const username = localStorage.getItem("username")
  return (
    <div className="iq-sidebar  sidebar-default ">
      <div id="sidebar-scrollbar">
        <nav className="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" className="iq-menu">
            <li className="">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <i className="las la-newspaper"></i>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              {username ? (
                <NavLink
                  to={`/user/${username}`}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <i className="las la-user"></i>
                  <span>Profile</span>
                </NavLink>
              ) : null}
            </li>
            {/* <li>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <i className="las fa fa-shopping-cart"></i>
                <span>Market</span>
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/search"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <i className="las fa fa-search"></i>
                <span>Search</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saved"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <i className="las fa-solid fa-bookmark"></i>
                <span>Saved</span>
              </NavLink>
            </li>
            {/* <li >
              <NavLink
                href=""
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <i className="las fa fa-cog"></i>
                <span>Settings</span>
              </NavLink>
            </li> */}
          </ul>
        </nav>
        <div className="p-5"></div>
      </div>
    </div>
  );
}
