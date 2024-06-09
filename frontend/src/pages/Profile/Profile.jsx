import React, { useEffect, useState, useRef, useContext } from "react";
import PostService from "../../services/PostService";
import ListPost from "../../components/ListPost/ListPost";
import CreatePost from "../../components/CreatePost/CreatePost";
import UserService from "../../services/UserService";
import { useParams } from "react-router-dom";
import RelationshipService from "../../services/RelationshipService";
import { UserContext } from "../../context/UserContext";

function Profile() {
  const [listPost, setListPost] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const token = localStorage.getItem("accessToken");
  const [account, setaccount] = useState("");
  const [listFollowing, setlistFollowing] = useState([]);
  const [listFollowers, setlistFollowers] = useState([]);
  const { username } = useParams();
  const [checkfollow, setcheckfollow] = useState();

  const context = useContext(UserContext);
  const handleHideFollow = () => {
    return context.user ? context.user.usname === username : false;
  };

  const [load, setload] = useState(false);

  const handleFollow = (e) => {
    e.preventDefault();
    RelationshipService.AddFollow(token, username)
      .then((res) => {
        setload(!load);
      })
      .catch((error) => {
        setload(!load);
        console.error("Error Follow", error);
      });
  };
  const handleUploadImage = ()=>{
    document.getElementById("upload_image").click();
  }
  useEffect(() => {
    PostService.GetAllPostByUsername(username)
      .then((res) => {
        setListPost(res.data);
        setPostCount(res.data.length);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
    UserService.getUserByUserName(username)
      .then((res) => {
        setaccount(res.data);
      })
      .catch((error) => {
        console.error("Error get User", error);
      });

    RelationshipService.Following(username)
      .then((res) => {
        setlistFollowing(res.data);
      })
      .catch((error) => {
        console.error("Error Follow of user", error);
      });

    RelationshipService.Followers(username)
      .then((res) => {
        setlistFollowers(res.data);
      })
      .catch((error) => {
        console.error("Error Follow of user", error);
      });
    RelationshipService.CheckFollow(token, username)
      .then((res) => {
        setcheckfollow(res.data);
      })
      .catch((error) => {
        console.error("Error check follow", error);
      });
  }, [username, load]);
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
                  </div>
                  <div className="user-detail text-center mb-3">
                    <div className="profile-img">
                      <img
                        src={account.avatar}
                        alt="profile-img"
                        className="avatar-130 img-fluid"
                      ></img>
                    </div>
                    <div className="profile-detail">
                      <h3 className="">{account.displayname}</h3>
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
                          <p className="mb-0">{listFollowers.length}</p>
                        </li>
                        <li className="text-center ps-3">
                          <h6>Following</h6>
                          <p className="mb-0">{listFollowing.length}</p>
                        </li>
                      </ul>
                    </div>
                    <div class="social-links">
                      <ul class="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                        {handleHideFollow() ? (
                          <>
                            <li className="text-center ms-auto">
                              <a
                                href=""
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                <i class="fa fa-cog" aria-hidden="true"></i>
                              </a>
                            </li>
                            <div
                              class="modal fade"
                              id="exampleModal"
                              tabindex="-1"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5
                                      class="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Edit Profile
                                    </h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <form>
                                  <div class="modal-body">
                                    <div class="form-group">
                                      <label class="form-label">
                                        DisplayName:
                                      </label>
                                      <input
                                        type="displayname"
                                        class="form-control"
                                        name="displayname"
                                        placeholder="Display Name"
                                        value={account.displayname}
                                      />
                                      <nav onClick={handleUploadImage}>
                                        <input                                          
                                          type="file"
                                          id="upload_image"
                                          style={{ display: "none" }}
                                          accept="image/*"
                                          name="image"
                                          value={account.image}  
                                        />
                                        <div
                                          class="nav nav-pills nav-fill stepwizard-row"
                                          id="nav-tab"
                                          role="tablist"
                                        >
                                          <a
                                            class="nav-link btn"
                                            id="bank-tab"
                                            data-toggle="tab"
                                            href="#bank-detail"
                                          >
                                            <i class="ri-camera-fill bg-soft-success text-success"></i>
                                            <span>Upload Image</span>
                                          </a>
                                        </div>
                                      </nav>
                                    </div>
                                  </div>
                                  </form>
                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-primary"
                                    >
                                      Save changes
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <li className="text-center pe-3">
                              {checkfollow ? (
                                <button
                                  type="button"
                                  className="btn mb-1 btn-primary"
                                  onClick={handleFollow}
                                >
                                  <i className="fas fa-user-plus me-1"></i>
                                  Follow
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn mb-1 btn-primary"
                                  onClick={handleFollow}
                                >
                                  Following
                                </button>
                              )}
                            </li>
                            <li className="text-center pe-3">
                              <button
                                type="button"
                                className="btn mb-1 btn-secondary"
                              >
                                <i className="fa fa-envelope me-1"></i>Chat
                              </button>
                            </li>
                          </>
                        )}
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
                      {handleHideFollow() ? <CreatePost /> : <></>}

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
