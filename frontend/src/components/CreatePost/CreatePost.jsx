import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import PostService from "../../services/PostService";

export default function CreatePost() {
  const token = localStorage.getItem("accessToken");
  const [createPost, setcreatePost] = useState({
    content: "",
    imageUrl: "",
  });
  const handleChange = (e) => {
    setcreatePost({ ...createPost, [e.target.name]: e.target.value });
  };
  const formRef = useRef(null);

  const handleButtonClick = (e) => {
    if (formRef.current) {
      e.preventDefault();
      PostService.createPost(createPost, token)
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
  return (
    <div id="post-modal-data" className="card">
      {/* <div className="card-header d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Create Post</h4>
          </div>
        </div> */}
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="user-img">
            <img
              src="../assets/images/user/1.jpg"
              alt="userimg"
              className="avatar-50 rounded-circle"
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
              <h5 className="modal-title" id="post-modalLabel">
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
                <form ref={formRef} className="post-text ms-3 w-100">
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
  );
}
