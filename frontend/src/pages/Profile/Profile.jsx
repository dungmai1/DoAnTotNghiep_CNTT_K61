import React, { useEffect, useState, useRef } from "react";
import PostService from "../../services/PostService";
import ListPost from "../../components/ListPost/ListPost";
import CreatePost from "../../components/CreatePost/CreatePost";
import UserService from "../../services/UserService";
function Profile() {
  const [listPost, setListPost] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const token = localStorage.getItem("accessToken");
  const [user, setuser] = useState("");
  useEffect(() => {
    PostService.getAllPostByUser(token)
      .then((res) => {
        setListPost(res.data);
        setPostCount(res.data.length);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
    UserService.getUser(token)
      .then((res) => {
        setuser(res.data);
      })
      .catch((error) => {
        console.error("Error get User", error);
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
                        src={user.avatar}
                        alt="profile-img"
                        className="avatar-130 img-fluid"
                      />
                    </div>
                    <div className="profile-detail">
                      <h3 className="">{user.displayname}</h3>
                    </div>
                  </div>
                  <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                    <div className="social-info">
                      <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                        <li className="text-center ps-3">
                          <h6>Posts</h6>
                          <p className="mb-0">{postCount}</p>
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
                    <div className="col-lg-8 mx-auto">
                      <CreatePost />
                      {listPost.map((post) => (
                        <ListPost key={post.id} post={post} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-sm-12 text-center">
            <img
              src="../assets/images/page-img/page-load-loader.gif"
              alt="loader"
              style={{ height: "100px" }}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default Profile;
