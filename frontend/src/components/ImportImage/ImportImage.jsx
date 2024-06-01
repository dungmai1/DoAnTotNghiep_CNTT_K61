import React from "react";
import { useState, useEffect } from "react";

import { FileUploader } from "react-drag-drop-files";
import ListPost from "../ListPost/ListPost";
import Yolov8 from "../../services/Yolov8";
import PostService from "../../services/PostService";

const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

export default function ImportImage() {
  // const [listPost, setListPost] = useState([]);
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   PostService.getAllPost(token)
  //     .then((res) => {
  //       setListPost(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching posts:", error);
  //     });
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Yolov8.predict(fileName)
      .then((res) => {
        setdisplayImage(res.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  const [file, setFile] = useState(null);
  const [fileName, setfileName] = useState(null);
  const [displayImage, setdisplayImage] = useState(null);
  const image = "http://127.0.0.1:6868/" + displayImage;
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setfileName(e.target.files[0]);
  };
  return (
    <div id="content-page" className="content-page">
      <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Import Image</h4>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="event-post position-relative">
                        <input type="file" onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <a href="" onClick={handleSubmit}>
                        Search
                      </a>
                    </div>
                    <img
                      src={file}
                      alt="gallary-image"
                      className="img-fluid rounded"
                      style={{ border: "2px dashed #000" }}
                    />
                  </div>
                </div>
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Filter</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="card">
                <div className="card-body">
                  <div className="post-item">
                    <div className="user-post-data pb-3">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <img
                            className="rounded-circle avatar-60"
                            src="../assets/images/user/1.jpg"
                            alt=""
                          />
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between flex-wrap">
                            <div className="">
                              <h5 className="mb-0 d-inline-block">
                                <a href="#" className="">
                                  Bni Cyst
                                </a>
                              </h5>
                              <p className="ms-1 mb-0 d-inline-block">
                                Add New Post
                              </p>
                              <p className="mb-0">Thoi gian</p>
                            </div>
                            <div className="card-post-toolbar">
                              <div className="dropdown">
                                <span
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  role="button"
                                >
                                  <i className="ri-more-fill"></i>
                                </span>
                                <div className="dropdown-menu m-0 p-0">
                                  <a className="dropdown-item p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-save-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Save Post</h6>
                                        <p className="mb-0">
                                          Add this to your saved items
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                  <a className="dropdown-item p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-pencil-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Edit Post</h6>
                                        <p className="mb-0">
                                          Update your post and saved items
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                  <a className="dropdown-item p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-close-circle-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Hide From Timeline</h6>
                                        <p className="mb-0">
                                          See fewer posts like this.
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                  <a className="dropdown-item p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-delete-bin-7-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Delete</h6>
                                        <p className="mb-0">
                                          Remove thids Post on Timeline
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                  <a className="dropdown-item p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-notification-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Notifications</h6>
                                        <p className="mb-0">
                                          Turn on notifications for this post
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <p>Content</p>
                    </div>
                    <div className="user-post">
                      <a href="#">
                        <img
                          src={image}
                          alt="post-image"
                          className="img-fluid w-50"
                        />
                      </a>
                    </div>
                    <div className="comment-area mt-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="like-data">
                              <div className="dropdown">
                                <span
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  role="button"
                                >
                                  <img
                                    src="../assets/images/icon/01.png"
                                    className="img-fluid"
                                    alt=""
                                  />
                                </span>
                                <div className="dropdown-menu py-2">
                                  <a
                                    className="ms-2 me-2"
                                    href="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Like"
                                  >
                                    <img
                                      src="../assets/images/icon/01.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    className="me-2"
                                    href="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Love"
                                  >
                                    <img
                                      src="../assets/images/icon/02.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    className="me-2"
                                    href="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Happy"
                                  >
                                    <img
                                      src="../assets/images/icon/03.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    className="me-2"
                                    href="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="HaHa"
                                  >
                                    <img
                                      src="../assets/images/icon/04.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    className="me-2"
                                    href="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Think"
                                  >
                                    <img
                                      src="../assets/images/icon/05.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    className="me-2"
                                    href="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Sade"
                                  >
                                    <img
                                      src="../assets/images/icon/06.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    className="me-2"
                                    href="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Lovely"
                                  >
                                    <img
                                      src="../assets/images/icon/07.png"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="total-like-block ms-2 me-3">
                              <div className="dropdown">
                                <span
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  role="button"
                                >
                                  140 Likes
                                </span>
                                <div className="dropdown-menu">
                                  <a className="dropdown-item" href="#">
                                    Max Emum
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Bill Yerds
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Hap E. Birthday
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Tara Misu
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Midge Itz
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Sal Vidge
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Other
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="total-comment-block">
                            <div className="dropdown">
                              <span
                                className="dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                role="button"
                              >
                                20 Comment
                              </span>
                              <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">
                                  Max Emum
                                </a>
                                <a className="dropdown-item" href="#">
                                  Bill Yerds
                                </a>
                                <a className="dropdown-item" href="#">
                                  Hap E. Birthday
                                </a>
                                <a className="dropdown-item" href="#">
                                  Tara Misu
                                </a>
                                <a className="dropdown-item" href="#">
                                  Midge Itz
                                </a>
                                <a className="dropdown-item" href="#">
                                  Sal Vidge
                                </a>
                                <a className="dropdown-item" href="#">
                                  Other
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="share-block d-flex align-items-center feather-icon mt-2 mt-md-0">
                          <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#share-btn"
                            aria-controls="share-btn"
                          >
                            <i className="ri-share-line"></i>
                            <span className="ms-1">99 Share</span>
                          </a>
                        </div>
                      </div>
                      <hr />
                      <ul className="post-comments p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex flex-wrap">
                            <div className="user-img">
                              <img
                                src="../assets/images/user/02.jpg"
                                alt="userimg"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Monty Carlo</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <a href="#">like</a>
                                <a href="#">reply</a>
                                <a href="#">translate</a>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex flex-wrap">
                            <div className="user-img">
                              <img
                                src="../assets/images/user/03.jpg"
                                alt="userimg"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Paul Molive</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <a href="#">like</a>
                                <a href="#">reply</a>
                                <a href="#">translate</a>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form
                        className="comment-text d-flex align-items-center mt-3"
                        action="javascript:void(0);"
                      >
                        <input
                          type="text"
                          className="form-control rounded"
                          placeholder="Enter Your Comment"
                        />
                        <div className="comment-attagement d-flex">
                          <a href="#">
                            <i className="ri-link me-3"></i>
                          </a>
                          <a href="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </a>
                          <a href="#">
                            <i className="ri-camera-line me-3"></i>
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
