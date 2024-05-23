import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import "../Message/Message.css";
export default function Message() {
  return (
    <>
      <Topbar />
      <div id="content-page" className="content-page"style={{marginTop: '75px'}}>
        <div class="container">
          <div class="row clearfix">
            <div class="col-lg-12">
              <div class="card chat-app">
                <div id="plist" class="people-list">
                  <form class="me-2 position-relative searchbox">
                    <div class="form-group mb-0">
                      <input
                        type="email"
                        class="form-control search-input"
                        id="exampleInputEmail1"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                  <ul class="list-unstyled chat-list mt-2 mb-0">
                    <li class="clearfix">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt="avatar"
                      />
                      <div class="about">
                        <div class="name">Vincent Porter</div>
                        <div class="status">
                          {" "}
                          <i class="fa fa-circle offline"></i> left 7 mins ago{" "}
                        </div>
                      </div>
                    </li>
                    <li class="clearfix active">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        alt="avatar"
                      />
                      <div class="about">
                        <div class="name">Aiden Chavez</div>
                        <div class="status">
                          {" "}
                          <i class="fa fa-circle online"></i> online{" "}
                        </div>
                      </div>
                    </li>
                    <li class="clearfix">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        alt="avatar"
                      />
                      <div class="about">
                        <div class="name">Mike Thomas</div>
                        <div class="status">
                          {" "}
                          <i class="fa fa-circle online"></i> online{" "}
                        </div>
                      </div>
                    </li>
                    <li class="clearfix">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="avatar"
                      />
                      <div class="about">
                        <div class="name">Christian Kelly</div>
                        <div class="status">
                          {" "}
                          <i class="fa fa-circle offline"></i> left 10 hours ago{" "}
                        </div>
                      </div>
                    </li>
                    <li class="clearfix">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar8.png"
                        alt="avatar"
                      />
                      <div class="about">
                        <div class="name">Monica Ward</div>
                        <div class="status">
                          {" "}
                          <i class="fa fa-circle online"></i> online{" "}
                        </div>
                      </div>
                    </li>
                    <li class="clearfix">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        alt="avatar"
                      />
                      <div class="about">
                        <div class="name">Dean Henry</div>
                        <div class="status">
                          {" "}
                          <i class="fa fa-circle offline"></i> offline since Oct
                          28{" "}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="chat">
                  <div class="chat-header clearfix">
                    <div class="row">
                      <div class="col-lg-6">
                        <a
                          href="javascript:void(0);"
                          data-toggle="modal"
                          data-target="#view_info"
                        >
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar2.png"
                            alt="avatar"
                          />
                        </a>
                        <div class="chat-about">
                          <h6 class="m-b-0">Aiden Chavez</h6>
                          <small>Last seen: 2 hours ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="chat-history">
                    <ul class="m-b-0">
                      <li class="clearfix">
                        <div class="message other-message float-right">
                          {" "}
                          Hi Aiden, how are you? How is the project coming
                          along?{" "}
                        </div>
                      </li>
                      <li class="clearfix">
                        <div class="message my-message">
                          Are we meeting today?
                        </div>
                      </li>
                      <li class="clearfix">
                        <div class="message my-message">
                          Project has been already finished and I have results
                          to show you.
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="send-message clearfix">
                    <div class="input-group mb-0">
                      <div class="input-group-prepend">
                      <span class="input-group-text">
                          <i class="fas fa-solid fa-paper-plane" style={{height:'30px'}}></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter text here..."
                      />
                    </div>
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
