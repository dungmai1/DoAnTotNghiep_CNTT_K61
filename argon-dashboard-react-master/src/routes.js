/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Users from "views/examples/Users.js";
import Icons from "views/examples/Icons.js";
import Posts from "views/examples/Posts.js";
import UserDetail from "views/examples/UserDetail";
import PostBanned from "views/examples/PostBanned";
import NewUser from "views/examples/NewUser";
import Detect from "views/examples/Detect";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  {
    path: "/posts",
    name: "Posts",
    icon: "ni ni-planet text-blue",
    component: <Posts />,
    layout: "/admin",
  },
  {
    path: "/posts/banned",
    name: "Posts Banned",
    icon: "ni ni-single-02 text-yellow",
    component: <PostBanned />,
    layout: "/admin",
  },
  {
    path: "/userdetail/:username",
    icon: "ni ni-single-02 text-yellow",
    name: "User Details",
    component: <UserDetail/>,
    layout: "/admin",
  },
  {
    path: "/users/addUser",
    icon: "ni ni-single-02 text-yellow",
    name: "Add User",
    component: <NewUser/>,
    layout: "/admin",
  },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Users />,
    layout: "/admin",
  },
  {
    path: "/detect",
    name: "Detect",
    icon: "ni ni-circle-08 text-pink",
    component: <Detect />,
    layout: "/admin",
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: <Login />,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },
];
export default routes;
