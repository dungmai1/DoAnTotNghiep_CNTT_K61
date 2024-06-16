import { Avatar, Center, Flex } from "@chakra-ui/react";
import { storage } from "../../firebase/config";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import LikeService from "services/LikeService";
import "./ListPost.css";
import { Link, NavLink, Navigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import CommentService from "services/CommentService";
import { MdMoreHoriz } from "react-icons/md";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Button,
} from "reactstrap";
import PostService from "services/PostService";
export default function ListPost({ post, load, setload }) {
  const [countcomment, setcountcomment] = useState("");

  const [countlike, setcountlike] = useState("");
  const [imgUrls, setimgUrls] = useState([]);
  const PostTime = formatDistanceToNow(
    post.postTime,
    { locale: vi },
    {
      addSuffix: true,
    }
  );
  const formatPostTime = PostTime.replace(" giây", "s")
    .replace(" phút", "m")
    .replace(" giờ", "h")
    .replace(" ngày", "d")
    .replace(" tháng", "mo")
    .replace(" năm", "y")
    .replace("dưới", "")
    .replace("khoảng", "")
    .replace(" ", "");
  const token = localStorage.getItem("accessToken");
  const banPost = (postId) => {
    PostService.banPost(token, postId)
      .then((res) => {
        alert("Ban success");
        setload(!load);
      })
      .catch((err) => {
        console.error("Error ban post", err);
      });
  };
  const UnbanPost = (postId)=>{
    PostService.UnbanPost(token, postId)
      .then((res) => {
        alert("UnBan success");
        setload(!load);
      })
      .catch((err) => {
        console.error("Error unban post", err);
      });
  }
  useEffect(() => {
    CommentService.CountAllCommentForPost(post.id)
      .then((res) => {
        setcountcomment(res.data);
      })
      .catch((error) => {
        console.error("Error count comment", error);
      });
    LikeService.CountAllLikeForPost(post.id)
      .then((res) => {
        setcountlike(res.data);
      })
      .catch((error) => {
        console.error("Error Like list:", error);
      });
    listAll(ref(storage, `dataImage/${post.imageUrl}`)).then((imgs) => {
      const promises = imgs.items.map((val) => getDownloadURL(val));
      Promise.all(promises).then((urls) => {
        setimgUrls(urls);
      });
    });
  }, []);
  return (
    // <div className="col-sm-4">
    <>
      <div className="card mb-3">
        <div className="card">
          <div className="card-body">
            <div className="post-item">
              <div className="user-post-data pb-1">
                <div className="d-flex justify-content-between">
                  <div className="me-2">
                    <Avatar src={post.user.avatar} style={{ width: "30px" }} />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between flex-wrap">
                      <div className="">
                        <h5 className="mb-0 d-inline-block avatarToolTip">
                          <div style={{ fontSize: "15px" }}>
                            {post.user.displayname}
                          </div>
                        </h5>
                        <p className="ms-1 mb-0 d-inline-block ml-2">
                          {" "}
                          {formatPostTime}
                        </p>
                      </div>
                      <div className="card-post-toolbar">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="md"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            {/* <DropdownItem> */}
                            <NavLink
                              to={`/admin/userdetail/${post.user.usname}`}
                              className="nav-link"
                            >
                              View Details
                            </NavLink>
                            {/* </DropdownItem> */}
                            {post.status === 1 ? (
                              <DropdownItem onClick={() => banPost(post.id)}>
                                Ban
                              </DropdownItem>
                            ) : (
                              <DropdownItem onClick={() => UnbanPost(post.id)}>
                                UnBan
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div>{post.content}</div>
              </div>
              <div className="image-container">
                {imgUrls.length > 0
                  ? imgUrls.map((url, index) => (
                      <img
                        src={url}
                        alt={`post-image-${index}`}
                        className="img-fluid"
                      />
                    ))
                  : null}
              </div>
              <div className="comment-area mt-1">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="like-block position-relative d-flex align-items-center">
                    <Center>
                      <Flex marginRight="10">
                        <FaRegHeart />
                      </Flex>
                      <Flex>
                        <span>{countlike}</span>
                      </Flex>
                    </Center>
                    <Center>
                      <Flex marginLeft="10">
                        <FaRegComment />
                      </Flex>
                      <Flex marginLeft="10">
                        <span>{countcomment}</span>
                      </Flex>
                    </Center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
