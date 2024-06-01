import React from "react";
import Topbar from "../../components/Topbar/Topbar.jsx";
import SideBar from "../../components/Sidebar/Sidebar.jsx";
import RightSidebar from "../../components/RightSidebar/RightSidebar.jsx";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="wrapper">
      <SideBar/>
      <Topbar/>
      {/* <RightSidebar/> */}
      <div className="contents" style={{ marginTop: "75px" }}>
        <Outlet />
      </div>
    </div>
  );
}
