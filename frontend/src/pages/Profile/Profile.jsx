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
  const { phone } = useParams();
  
  // const [load, setload] = useState(false);
  // const handleLoad = () => {
  //   setload(!load);
  // };
  // const handleFollow = () =>{
  //   RelationshipService.AddFollow(token,targetId)
  //   .then((res)=>{
  //     alert("Sucess")
  //   })
  //   .catch((error)=>{
  //     console.error("Error Add Follow",error )
  //   })
  // }

  const user = useContext(UserContext);
  const handleHideFollow = (user, phone) => {
    return user ? user.phone === phone : false;
  };
  useEffect(() => {
    PostService.getAllPostsByPhone(phone)
      .then((res) => {
        setListPost(res.data);
        setPostCount(res.data.length);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
    UserService.getUserByPhone(phone)
      .then((res) => {
        setaccount(res.data);
      })
      .catch((error) => {
        console.error("Error get User", error);
      });

    RelationshipService.Following(phone)
      .then((res) => {
        setlistFollowing(res.data);
      })
      .catch((error) => {
        console.error("Error Follow of user", error);
      });

    RelationshipService.Followers(phone)
      .then((res) => {
        setlistFollowers(res.data);
      })
      .catch((error) => {
        console.error("Error Follow of user", error);
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
                        src={account.avatar}
                        alt="profile-img"
                        className="avatar-130 img-fluid"
                      />
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
                        {handleHideFollow(user, phone) ? <></>:
                          <>
                            <li className="text-center pe-3">
                              <button
                                type="button"
                                className="btn mb-1 btn-primary"
                              >
                                <i className="fas fa-user-plus me-1"></i>Follow
                              </button>
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
                        }
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
