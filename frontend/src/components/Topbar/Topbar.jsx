import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Topbar.css";
import UserService from "../../services/UserService";
import { UserContext } from "../../context/UserContext";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

export default function Topbar() {
  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    CometChatUIKit.logout();
    console.log("FFFFF");
    window.location.replace("http://localhost:3000/");
  };
  const context = useContext(UserContext);
  useEffect(() => {
    // LoginComet(username);
  }, []);
  return (
    <div className="iq-top-navbar">
      <div className="iq-navbar-custom">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="iq-navbar-logo d-flex justify-content-between">
            <Link to="/">
              <img
                src="./assets/images/logo.png"
                className="img-fluid"
                alt=""
              />
              <span>NewSocial</span>
            </Link>
          </div>
          <div className="iq-search-bar device-search">
            <form action="#" className="searchbox">
              <a className="search-link" href="">
                <i className="ri-search-line"></i>
              </a>
              <input
                type="text"
                className="text search-input"
                placeholder="Search here..."
              />
            </form>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
          >
            <i className="ri-menu-3-line"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  ms-auto navbar-list">
              {/* <li className="nav-item dropdown">
                             <a href="#" className="dropdown-toggle" id="group-drop" data-bs-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false"><i className="ri-group-line"></i></a>
                            <div className="sub-drop sub-drop-large dropdown-menu" aria-labelledby="group-drop">
                                <div className="card shadow-none m-0">
                                     <div className="card-header d-flex justify-content-between bg-primary">
                                    <div className="header-title">
                                    <h5 className="mb-0 text-white">Friend Request</h5>
                                    </div>
                                    <small className="badge  bg-light text-dark ">4</small>
                                </div>
                                    <div className="card-body p-0">
                                        <div className="iq-friend-request">
                                            <div
                                                className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center">
                                                        <img className="avatar-40 rounded" src="./assets/images/user/01.jpg"
                                                            alt=""/>
                                                    <div className="ms-3">
                                                        <h6 className="mb-0 ">Jaques Amole</h6>
                                                        <p className="mb-0">40 friends</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void();"
                                                        className="me-3 btn btn-primary rounded">Confirm</a>
                                                    <a href="javascript:void();"
                                                        className="me-3 btn btn-secondary rounded">Delete Request</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="iq-friend-request">
                                            <div
                                                className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center">
                                                        <img className="avatar-40 rounded" src="../assets/images/user/02.jpg"
                                                            alt=""/>
                                                    <div className="ms-3">
                                                        <h6 className="mb-0 ">Lucy Tania</h6>
                                                        <p className="mb-0">12 friends</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void();"
                                                        className="me-3 btn btn-primary rounded">Confirm</a>
                                                    <a href="javascript:void();"
                                                        className="me-3 btn btn-secondary rounded">Delete Request</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="iq-friend-request">
                                            <div
                                                className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center">
                                                        <img className="avatar-40 rounded" src="../assets/images/user/03.jpg"
                                                            alt=""/>
                                                    <div className=" ms-3">
                                                        <h6 className="mb-0 ">Manny Petty</h6>
                                                        <p className="mb-0">3 friends</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void();"
                                                        className="me-3 btn btn-primary rounded">Confirm</a>
                                                    <a href="javascript:void();"
                                                        className="me-3 btn btn-secondary rounded">Delete Request</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="iq-friend-request">
                                            <div
                                                className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center">
                                                        <img className="avatar-40 rounded" src="../assets/images/user/04.jpg"
                                                            alt=""/>
                                                    <div className="ms-3">
                                                        <h6 className="mb-0 ">Marsha Mello</h6>
                                                        <p className="mb-0">15 friends</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <a href="javascript:void();"
                                                        className="me-3 btn btn-primary rounded">Confirm</a>
                                                    <a href="javascript:void();"
                                                        className="me-3 btn btn-secondary rounded">Delete Request</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <a href="#" className=" btn text-primary">View More Request</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li> */}
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="search-toggle   dropdown-toggle"
                  id="notification-drop"
                  data-bs-toggle="dropdown"
                >
                  <i className="ri-notification-4-line position-relative">
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge">
                      <span className="visually-hidden">Unread message</span>
                    </span>
                  </i>
                </a>
                <div
                  className="sub-drop dropdown-menu"
                  aria-labelledby="notification-drop"
                >
                  <div className="card shadow-none m-0">
                    <div className="card-header d-flex justify-content-between bg-primary">
                      <div className="header-title bg-primary">
                        <h5 className="mb-0 text-white">All Notifications</h5>
                      </div>
                      <small className="badge  bg-light text-dark">4</small>
                    </div>
                    <div className="card-body p-0">
                      <a href="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <img
                              className="avatar-40 rounded"
                              src="../assets/images/user/01.jpg"
                              alt=""
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">Emma Watson Bni</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">95 MB</p>
                              <small className="float-right font-size-12">
                                Just Now
                              </small>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <img
                              className="avatar-40 rounded"
                              src="../assets/images/user/02.jpg"
                              alt=""
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">New customer is join</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                5 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <img
                              className="avatar-40 rounded"
                              src="../assets/images/user/03.jpg"
                              alt=""
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">Two customer is left</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                2 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <img
                              className="avatar-40 rounded"
                              src="../assets/images/user/04.jpg"
                              alt=""
                            />
                          </div>
                          <div className="w-100 ms-3">
                            <h6 className="mb-0 ">New Mail from Fenny</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                3 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="/message"
                  id="mail-drop"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="ri-mail-line position-relative">
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge">
                      <span className="visually-hidden">Unread message</span>
                    </span>
                  </i>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="   d-flex align-items-center dropdown-toggle"
                  id="drop-down-arrow"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={context.user ? context.user.avatar : ""}
                    className="img-fluid rounded-circle me-3"
                    alt="user"
                  />
                  <div className="caption">
                    <h6 className="mb-0 line-height">
                      {context.user ? context.user.displayname : ""}
                    </h6>
                  </div>
                </a>
                <div
                  className="sub-drop dropdown-menu caption-menu"
                  aria-labelledby="drop-down-arrow"
                >
                  <div className="card shadow-none m-0">
                    <div className="card-body p-0 ">
                      <div className="d-inline-block w-100 text-center">
                        <a
                          className="btn btn-primary iq-sign-btn"
                          href=""
                          role="button"
                          onClick={handleSignOut}
                        >
                          Sign out<i className="ri-login-box-line ms-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
