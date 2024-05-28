import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
export default function Sidebar() {
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
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <i className="las la-user"></i>
                <span>Profile</span>
              </NavLink>
            </li>
            {/* <li class=" ">
              <a
                href="#mailbox"
                data-bs-toggle="collapse"
                class="  collapsed"
                aria-expanded="false"
              >
                <i class="ri-mail-line"></i>
                <span>Group</span>
                <i class="ri-arrow-right-s-line iq-arrow-right"></i>
              </a>
              <ul
                id="mailbox"
                class="iq-submenu collapse"
                data-bs-parent="#iq-sidebar-toggle"
              >
                <li class="">
                  <NavLink to="/group">
                    <i class="  ri-inbox-line"></i>Group 1
                  </NavLink>
                </li>
                <li class="">
                  <NavLink to="/group">
                    <i class="ri-edit-line"></i>Group 2
                  </NavLink>
                </li>
              </ul>
            </li> */}

            <li className=" ">
              <a href="/group" className=" ">
                <i className="las fa fa-shopping-cart"></i>
                <span>Markets</span> 
              </a>
            </li>
            <li className=" ">
              <NavLink to="/search" className=" ">
                <i className="las fa fa-search"></i>
                <span>Search</span> 
              </NavLink>
            </li>
            <li className=" ">
              <a href="../app/todo.html" className=" ">
                <i className="las fa-solid fa-bookmark"></i>
                <span>Saved</span>
              </a>
            </li>
            <li className=" ">
              <a href="../app/todo.html" className=" ">
                <i className="las fa fa-cog"></i>
                <span>Settings</span> 
              </a>
            </li>

          </ul>
        </nav>
        <div className="p-5"></div>
      </div>
    </div>
  );
}
