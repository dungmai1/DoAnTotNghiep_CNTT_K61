import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterService from "../../services/RegisterService";

export default function Register() {
  const [dataRegister,setdataRegister] = useState("")
  const handleChange = (e) =>{
    setdataRegister({...dataRegister,[e.target.name]:e.target.value})
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    RegisterService.Register(dataRegister)
    .then((res)=>{
      alert("Succes")
      console.log(dataRegister)
    })
    .catch((error)=>{
      console.error("Error Register",error)
      console.log(dataRegister)
    })
  }
  return (
    <body className=" ">
      <div className="wrapper">
        <section className="sign-in-page">
          <div id="container-inside">
            <div id="circle-small"></div>
            <div id="circle-medium"></div>
            <div id="circle-large"></div>
            <div id="circle-xlarge"></div>
            <div id="circle-xxlarge"></div>
          </div>
          <div className="container p-0">
            <div className="row no-gutters">
              <div className="col-md-6 text-center pt-5">
                <div className="sign-in-detail text-white">
                  <a className="sign-in-logo mb-5" href="#">
                    <img
                      src="../assets/images/logo-full.png"
                      className="img-fluid"
                      alt="logo"
                    />
                  </a>
                  <div className="sign-slider overflow-hidden ">
                    <ul className="swiper-wrapper list-inline m-0 p-0 ">
                      <li className="swiper-slide">
                        <img
                          src="../assets/images/login/1.png"
                          className="img-fluid mb-4"
                          alt="logo"
                        />
                        <h4 className="mb-1 text-white">Find new friends</h4>
                        <p>
                          It is a long established fact that a reader will be
                          distracted by the readable content.
                        </p>
                      </li>
                      <li className="swiper-slide">
                        <img
                          src="../assets/images/login/2.png"
                          className="img-fluid mb-4"
                          alt="logo"
                        />
                        <h4 className="mb-1 text-white">Connect with the world</h4>
                        <p>
                          It is a long established fact that a reader will be
                          distracted by the readable content.
                        </p>
                      </li>
                      <li className="swiper-slide">
                        <img
                          src="../assets/images/login/3.png"
                          className="img-fluid mb-4"
                          alt="logo"
                        />
                        <h4 className="mb-1 text-white">Create new events</h4>
                        <p>
                          It is a long established fact that a reader will be
                          distracted by the readable content.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 bg-white pt-5 pt-5 pb-lg-0 pb-5">
                <div className="sign-in-from">
                  <h1 className="mb-0">Sign Up</h1>
                  <p>
                    Enter your phone number and password to access home page.
                  </p>
                  <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label" for="exampleInputEmail1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control mb-0"
                        placeholder="Your Full Name"
                        name="displayname"
                        value={dataRegister.displayname}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" for="exampleInputEmail2">
                        Phone Number
                      </label>
                      <input
                        type="phone"
                        className="form-control mb-0"
                        placeholder="Enter Phone Number"
                        name="phone"
                        value={dataRegister.phone}
                        onChange={handleChange}

                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" for="exampleInputPassword1">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control mb-0"
                        placeholder="Password"
                        name="password"
                        value={dataRegister.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-inline-block w-100">
                      <div className="form-check d-inline-block mt-2 pt-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheck1"
                        />
                        <label className="form-check-label" for="customCheck1">
                          I accept <a href="#">Terms and Conditions</a>
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary float-end">
                        Sign Up
                      </button>
                    </div>
                    <div className="sign-info">
                      <span className="dark-color d-inline-block line-height-2">
                        Already Have Account ? 
                        <Link to="/login">Log In</Link>
                      </span>
                      <ul className="iq-social-media">
                        <li>
                          <a href="#">
                            <i className="ri-facebook-box-line"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ri-twitter-line"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ri-instagram-line"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </body>
  );
}
