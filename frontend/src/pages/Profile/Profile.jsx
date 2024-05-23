import React, { useEffect, useState, useRef } from "react";
import PostService from "../../services/PostService";
import { saveAs } from "file-saver";

import { formToJSON } from "axios";

function Profile() {
  const [listPost, setListPost] = useState([]);
  const [createPost, setcreatePost] = useState({
    content: "",
    imageUrl: "",
    user: {
      id: 1,
    },
  });
  const handleChange = (e) => {
    setcreatePost({ ...createPost, [e.target.name]: e.target.value });
  };
  const formRef = useRef(null);

  const handleButtonClick = (e) => {
    if (formRef.current) {
      e.preventDefault();
      PostService.createPost(createPost)
        .then((res) => {
          alert("Success");
        })
        .catch((error) => {
          console.error("Error Create Post", error);
          console.log(createPost);
        });
    }
  };
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setcreatePost({ ...createPost, imageUrl: file.name });
    const reader = new FileReader();
    reader.onload = () => {
      const imageContainer = document.querySelector(".imageContainer");
      imageContainer.innerHTML = ` <img src="${reader.result}" alt="post-image" className="img-fluid w-100"/>`;
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    PostService.getAllPost()
      .then((res) => {
        setListPost(res.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);
  return (
    <div id="content-page" className="content-page">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body profile-page p-0">
                <div className="profile-header">
                  <div className="position-relative">
                    <img
                      src="../assets/images/page-img/profile-bg1.jpg"
                      alt="profile-bg"
                      className="rounded img-fluid"
                    />
                    <ul className="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0">
                      <li>
                        <a href="#">
                          <i className="ri-pencil-line"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ri-settings-4-line"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="user-detail text-center mb-3">
                    <div className="profile-img">
                      <img
                        src="../assets/images/user/11.png"
                        alt="profile-img"
                        className="avatar-130 img-fluid"
                      />
                    </div>
                    <div className="profile-detail">
                      <h3 className="">Dung Mai</h3>
                    </div>
                  </div>
                  <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                    <div className="social-links">
                      <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                        <li className="text-center pe-3">
                          <a href="#">
                            <img
                              src="../assets/images/icon/08.png"
                              className="img-fluid rounded"
                              alt="facebook"
                            />
                          </a>
                        </li>
                        <li className="text-center pe-3">
                          <a href="#">
                            <img
                              src="../assets/images/icon/09.png"
                              className="img-fluid rounded"
                              alt="Twitter"
                            />
                          </a>
                        </li>
                        <li className="text-center pe-3">
                          <a href="#">
                            <img
                              src="../assets/images/icon/10.png"
                              className="img-fluid rounded"
                              alt="Instagram"
                            />
                          </a>
                        </li>
                        <li className="text-center pe-3">
                          <a href="#">
                            <img
                              src="../assets/images/icon/11.png"
                              className="img-fluid rounded"
                              alt="Google plus"
                            />
                          </a>
                        </li>
                        <li className="text-center pe-3">
                          <a href="#">
                            <img
                              src="../assets/images/icon/12.png"
                              className="img-fluid rounded"
                              alt="You tube"
                            />
                          </a>
                        </li>
                        <li className="text-center md-pe-3 pe-0">
                          <a href="#">
                            <img
                              src="../assets/images/icon/13.png"
                              className="img-fluid rounded"
                              alt="linkedin"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="social-info">
                      <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                        <li className="text-center ps-3">
                          <h6>Posts</h6>
                          <p className="mb-0">690</p>
                        </li>
                        <li className="text-center ps-3">
                          <h6>Followers</h6>
                          <p className="mb-0">206</p>
                        </li>
                        <li className="text-center ps-3">
                          <h6>Following</h6>
                          <p className="mb-0">100</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body p-0">
                <div className="user-tabing">
                  <ul className="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                    <li className="nav-item col-12 col-sm-3 p-0">
                      <a
                        className="nav-link active"
                        href="#pills-timeline-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#timeline"
                        role="button"
                      >
                        Timeline
                      </a>
                    </li>
                    <li className="nav-item col-12 col-sm-3 p-0">
                      <a
                        className="nav-link"
                        href="#pills-about-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#about"
                        role="button"
                      >
                        About
                      </a>
                    </li>
                    <li className="nav-item col-12 col-sm-3 p-0">
                      <a
                        className="nav-link"
                        href="#pills-friends-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#friends"
                        role="button"
                      >
                        Friends
                      </a>
                    </li>
                    <li className="nav-item col-12 col-sm-3 p-0">
                      <a
                        className="nav-link"
                        href="#pills-photos-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#photos"
                        role="button"
                      >
                        Photos
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="timeline"
                role="tabpanel"
              >
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between">
                          <div className="header-title">
                            <h4 className="card-title">Life Event</h4>
                          </div>
                          <div className="card-header-toolbar d-flex align-items-center">
                            <p className="m-0">
                              <a href="javacsript:void();"> Create </a>
                            </p>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="event-post position-relative">
                                <a href="#">
                                  <img
                                    src="../assets/images/page-img/07.jpg"
                                    alt="gallary-image"
                                    className="img-fluid rounded"
                                  />
                                </a>
                                <div className="job-icon-position">
                                  <div className="job-icon bg-primary p-2 d-inline-block rounded-circle">
                                    <i className="ri-briefcase-line text-white"></i>
                                  </div>
                                </div>
                                <div className="card-body text-center p-2">
                                  <h5>Started New Job at Apple</h5>
                                  <p>January 24, 2019</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header d-flex justify-content-between">
                          <div className="header-title">
                            <h4 className="card-title">Photos</h4>
                          </div>
                          <div className="card-header-toolbar d-flex align-items-center">
                            <p className="m-0">
                              <a href="javacsript:void();">Add Photo </a>
                            </p>
                          </div>
                        </div>
                        <div className="card-body">
                          <ul className="profile-img-gallary p-0 m-0 list-unstyled">
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/page-img/g1.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/page-img/g2.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/page-img/g3.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/page-img/g4.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/page-img/g5.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/page-img/g6.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/page-img/g7.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/page-img/g8.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/page-img/g9.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header d-flex justify-content-between">
                          <div className="header-title">
                            <h4 className="card-title">Friends</h4>
                          </div>
                          <div className="card-header-toolbar d-flex align-items-center">
                            <p className="m-0">
                              <a href="javacsript:void();">Add New </a>
                            </p>
                          </div>
                        </div>
                        <div className="card-body">
                          <ul className="profile-img-gallary p-0 m-0 list-unstyled">
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/user/05.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                              <h6 className="mt-2 text-center">Anna Rexia</h6>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/user/06.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                              <h6 className="mt-2 text-center">Tara Zona</h6>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/user/07.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                              <h6 className="mt-2 text-center">Polly Tech</h6>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/user/08.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                              <h6 className="mt-2 text-center">Bill Emia</h6>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/user/09.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                              <h6 className="mt-2 text-center">Moe Fugga</h6>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/user/10.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                              <h6 className="mt-2 text-center">Hal Appeno</h6>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/user/07.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                              <h6 className="mt-2 text-center">Zack Lee</h6>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/user/06.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                              <h6 className="mt-2 text-center">Terry Aki</h6>
                            </li>
                            <li className="">
                              <a href="#">
                                <img
                                  src="../assets/images/user/05.jpg"
                                  alt="gallary-image"
                                  className="img-fluid"
                                />
                              </a>
                              <h6 className="mt-2 text-center">Greta Life</h6>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div id="post-modal-data" className="card">
                        <div className="card-header d-flex justify-content-between">
                          <div className="header-title">
                            <h4 className="card-title">Create Post</h4>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="user-img">
                              <img
                                src="../assets/images/user/1.jpg"
                                alt="userimg"
                                className="avatar-60 rounded-circle"
                              />
                            </div>
                            <form
                              className="post-text ms-3 w-100"
                              data-bs-toggle="modal"
                              data-bs-target="#post-modal"
                              action="#"
                            >
                              <input
                                type="text"
                                className="form-control rounded"
                                placeholder="Write something here..."
                                style={{ border: "none" }}
                              />
                            </form>
                          </div>
                          <hr />
                          <ul className="post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
                            <li className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2">
                              <img
                                src="../assets/images/small/07.png"
                                alt="icon"
                                className="img-fluid me-2"
                              />
                              Photo/Video
                            </li>
                            <li className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2">
                              <img
                                src="../assets/images/small/08.png"
                                alt="icon"
                                className="img-fluid me-2"
                              />
                              Tag Friend
                            </li>
                            <li className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3">
                              <img
                                src="../assets/images/small/09.png"
                                alt="icon"
                                className="img-fluid me-2"
                              />
                              Feeling/Activity
                            </li>
                          </ul>
                        </div>
                        <div
                          className="modal fade"
                          id="post-modal"
                          tabindex="-1"
                          aria-labelledby="post-modalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="post-modalLabel"
                                >
                                  Create Post
                                </h5>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  <i className="ri-close-fill"></i>
                                </button>
                              </div>
                              <div
                                className="modal-body overflow-scroll"
                                style={{ maxHeight: "500px" }}
                              >
                                <div className="d-flex align-items-center">
                                  <div className="user-img">
                                    <img
                                      src="../assets/images/user/1.jpg"
                                      alt="userimg"
                                      className="avatar-60 rounded-circle img-fluid"
                                    />
                                  </div>
                                  <form
                                    ref={formRef}
                                    className="post-text ms-3 w-100"
                                  >
                                    <input
                                      type="text"
                                      name="content"
                                      className="form-control rounded"
                                      placeholder="Write something here..."
                                      style={{ border: "none" }}
                                      value={createPost.content}
                                      onChange={handleChange}
                                    />
                                  </form>
                                </div>
                                <hr />
                                <div className="imageContainer"></div>
                                <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                  <li className="col-md-6 mb-3">
                                    <div
                                      className="bg-soft-primary rounded p-2 pointer me-3"
                                      onClick={handleFileSelect}
                                    >
                                      <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        name="image"
                                        value={createPost.image}
                                        onChange={handleFileInputChange}
                                      />
                                      <img
                                        src="../assets/images/small/07.png"
                                        alt="icon"
                                        className="img-fluid"
                                      />
                                      Photo/Video
                                    </div>
                                  </li>
                                  <li className="col-md-6 mb-3">
                                    <div className="bg-soft-primary rounded p-2 pointer me-3">
                                      <a href="#"></a>
                                      <img
                                        src="../assets/images/small/09.png"
                                        alt="icon"
                                        className="img-fluid"
                                      />
                                      Feeling/Activity
                                    </div>
                                  </li>
                                </ul>
                                <hr />
                                <button
                                  type="button"
                                  className="btn btn-primary d-block w-100 mt-3"
                                  onClick={handleButtonClick}
                                >
                                  Post
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {listPost.map((post) => (
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
                                        <p className="mb-0">{post.postTime}</p>
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
                                            <a
                                              className="dropdown-item p-3"
                                              href="#"
                                            >
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
                                            <a
                                              className="dropdown-item p-3"
                                              href="#"
                                            >
                                              <div className="d-flex align-items-top">
                                                <i className="ri-pencil-line h4"></i>
                                                <div className="data ms-2">
                                                  <h6>Edit Post</h6>
                                                  <p className="mb-0">
                                                    Update your post and saved
                                                    items
                                                  </p>
                                                </div>
                                              </div>
                                            </a>
                                            <a
                                              className="dropdown-item p-3"
                                              href="#"
                                            >
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
                                            <a
                                              className="dropdown-item p-3"
                                              href="#"
                                            >
                                              <div className="d-flex align-items-top">
                                                <i className="ri-delete-bin-7-line h4"></i>
                                                <div className="data ms-2">
                                                  <h6>Delete</h6>
                                                  <p className="mb-0">
                                                    Remove thids Post on
                                                    Timeline
                                                  </p>
                                                </div>
                                              </div>
                                            </a>
                                            <a
                                              className="dropdown-item p-3"
                                              href="#"
                                            >
                                              <div className="d-flex align-items-top">
                                                <i className="ri-notification-line h4"></i>
                                                <div className="data ms-2">
                                                  <h6>Notifications</h6>
                                                  <p className="mb-0">
                                                    Turn on notifications for
                                                    this post
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
                                <p>{post.content}</p>
                              </div>
                              <div className="user-post">
                                <a href="#">
                                  <img
                                    src={post.imageUrl}
                                    alt="post-image"
                                    className="img-fluid w-100"
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
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Max Emum
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Bill Yerds
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Hap E. Birthday
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Tara Misu
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Midge Itz
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Sal Vidge
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
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
                                        <p className="mb-0">
                                          Lorem ipsum dolor sit amet
                                        </p>
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
                                        <p className="mb-0">
                                          Lorem ipsum dolor sit amet
                                        </p>
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
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 text-center">
            <img
              src="../assets/images/page-img/page-load-loader.gif"
              alt="loader"
              style={{ height: "100px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
