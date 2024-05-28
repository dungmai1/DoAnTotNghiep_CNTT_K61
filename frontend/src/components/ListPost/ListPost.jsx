import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import LikeService from "../../services/LikeService";
import CommentService from "../../services/CommentService";

export default function ListPost({ post }) {
  const token = localStorage.getItem("accessToken");
  const formattedPostTime = formatDistanceToNow(post.postTime, {
    addSuffix: true,
  });
  // const formattedCommentTime = formatDistanceToNow(commentlist.commentTime, {
  //   addSuffix: true,
  // });
  const [countlike, setcountlike] = useState("");
  const [countcomment, setcountcomment] = useState("");
  const [userlikePost, setuserlikePost] = useState([]);
  const [commentlist, setcommentlist] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    LikeService.AddLike(post.id, token)
      .then((res) => {
        alert("Like success");
      })
      .catch((error) => {
        console.error("Error Add Like", error);
        console.log(post.id);
      });
  };
  useEffect(() => {
    LikeService.AllUserLikePost(post.id)
      .then((res) => {
        setuserlikePost(res.data);
      })
      .catch((error) => {
        console.error("Error All User Like Post", error);
      });

    LikeService.CountAllLikeForPost(post.id)
      .then((res) => {
        setcountlike(res.data);
      })
      .catch((error) => {
        console.error("Error Like list:", error);
      });

    CommentService.CountAllCommentForPost(post.id)
      .then((res) => {
        setcountcomment(res.data);
      })
      .catch((error) => {
        console.error("Error count comment", error);
      });

    CommentService.getAllCommentForPost(post.id, token)
      .then((res) => {
        setcommentlist(res.data);
      })
      .catch((error) => {
        console.error("Error comment list", error);
      });
  }, []);
  return (
    <div className="col-sm-12">
      <div className="card">
        <div className="card-body">
          <div className="post-item">
            <div className="user-post-data pb-1">
              <div className="d-flex justify-content-between">
                <div className="me-2">
                  <img
                    className="rounded-circle avatar-40"
                    src="../assets/images/user/1.jpg"
                    alt=""
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between flex-wrap">
                    <div className="">
                      <h5 className="mb-0 d-inline-block">
                        <a href="#" className="" style={{ fontSize: "15px" }}>
                          {post.user.displayname}
                        </a>
                      </h5>
                      <p className="ms-1 mb-0 d-inline-block">
                        {formattedPostTime}
                      </p>
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
                                <h6>Save</h6>
                              </div>
                            </div>
                          </a>
                          <a className="dropdown-item p-3" href="#">
                            <div className="d-flex align-items-top">
                              <i className="ri-close-circle-line h4"></i>
                              <div className="data ms-2">
                                <h6>Hide</h6>
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
              <div>{post.content}</div>
            </div>
            {post.imageUrl ? (
              <div className="user-post">
                <a href="#">
                  <img
                    src={post.imageUrl}
                    alt="post-image"
                    className="img-fluid w-50"
                  />
                </a>
              </div>
            ) : null}
            <div className="comment-area mt-1">
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
                          <i
                            className="far fa-heart"
                            aria-hidden="true"
                            onClick={() => handleSubmit()}
                          ></i>
                          <i
                            class="fas fa-heart"
                            style={{ color: "#ff0000" }}
                          ></i>
                        </span>
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
                          {countlike} Likes
                        </span>
                        <div className="dropdown-menu">
                          {userlikePost.map((userlikePost) => (
                            <a className="dropdown-item" href="#">
                              {userlikePost.displayname}
                            </a>
                          ))}
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
                        {countcomment} Comment
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
              </div>
              <hr />
              {commentlist.map((cmtList) => (
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
                        <h6>
                          {cmtList.user.displayname}
                        </h6>
                        <p className="mb-0">
                          {cmtList.content_cmt}
                          </p>
                        <div className="d-flex flex-wrap align-items-center comment-activity">
                          <a href="#">like</a>
                          <a href="#">reply</a>
                          <a href="#">translate</a>
                          <span>{formatDistanceToNow(cmtList.commentTime)}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
               ))} 
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
  );
}
