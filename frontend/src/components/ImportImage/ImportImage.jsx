import React from "react";
import { useState, useEffect } from "react";

import { FileUploader } from "react-drag-drop-files";
import ListPost from "../ListPost/ListPost";
import Yolov8 from "../../services/Yolov8";
import PostService from "../../services/PostService";

const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

export default function ImportImage() {
  const [listPost, setListPost] = useState([]);
  const [imagePaths, setimagePaths] = useState([]);
  const token = localStorage.getItem("accessToken");
  const handleSubmit = (e) => {
    e.preventDefault();
    Yolov8.predict(fileName)
      .then((res) => {
        const predictedImagePaths = res.data;
        setimagePaths(predictedImagePaths); 
        console.log("FolderId", res.data);
        PostService.getAllPostsByImagePaths(predictedImagePaths, token)
          .then((res) => {
            setListPost(res.data);
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  const [file, setFile] = useState(null);
  const [fileName, setfileName] = useState(null);
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setfileName(e.target.files[0]);
    setimagePaths([])
    setListPost([])
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
            {listPost.map((post) => (
              <ListPost post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
