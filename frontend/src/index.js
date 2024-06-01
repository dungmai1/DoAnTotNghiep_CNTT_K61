import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import NewsFeed from "./pages/NewsFeed/NewsFeed.jsx";
import Group from "./pages/Group/Group.jsx";
import Message from "./pages/Message/Message.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Search from "./pages/Search/Search.jsx";
import Saved from "./pages/Saved/Saved.jsx";
import checkAuth from "./Auth/checkAuth.js";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Error from "./pages/Error/Error.jsx";
import { UserProvider } from "./context/UserContext.js";

// const checkAuth = ()=>{
//   return localStorage.getItem("accessToken") !== null;
// }
const router = createBrowserRouter([
  {
    path: "/",
    element: checkAuth() ? <Home /> : <Navigate to="/login" />,
    children: [
      {
        path: "/",
        element: <NewsFeed />,
      },
      {
        path: "user/:phone",
        element: <Profile />,
      },
      {
        path: "group",
        element: <Group />,
      },
      {
        path: "saved",
        element: <Saved />,
      },
      {
        path: "error",
        element: <Error />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
  {
    path: "message",
    element: checkAuth() ? <Message /> : <Navigate to="/login" />,
  },
  {
    path: "login",
    element: checkAuth() ? <Navigate to="/" /> : <Login />,
  },
  {
    path: "register",
    element: checkAuth() ? <Navigate to="/" /> : <Register />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
