import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Content from "./pages/NewsFeed/NewsFeed.jsx";
import Group from "./pages/Group/Group.jsx"
import Message from "./pages/Message/Message.jsx";
import Login from "./pages/Login/Login.jsx"
import Register from "./pages/Register/Register.jsx"
import Search from "./pages/Search/Search.jsx"
import Saved from "./pages/Saved/Saved.jsx"

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Content/>,
      },
      {
        path: "profile",
        element: <Profile/>,
      },
      {
        path: "group",
        element: <Group/>,
      },
      {
        path: "saved",
        element: <Saved/>,
      }
    ],
  },
  {
    path: "message",
    element: <Message />,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "register",
    element: <Register/>,
  },
  {
    path: "search",
    element: <Search/>,
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
