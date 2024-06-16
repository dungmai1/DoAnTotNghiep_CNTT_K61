import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "services/UserService";
import RelationshipService from "services/RelationshipService";
import PostService from "services/PostService";
import ListPost from "components/ListPost/ListPost";
export default function UserDetail() {
  const [account, setaccount] = useState("");
  const [listFollowing, setlistFollowing] = useState([]);
  const [listFollowers, setlistFollowers] = useState([]);
  const [listPost, setListPost] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const { username } = useParams();

  useEffect(() => {
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
    PostService.GetAllPostByUsername(username)
      .then((res) => {
        const sortedPosts = res.data.sort((a, b) => {
          return new Date(b.postTime) - new Date(a.postTime);
        });
        setListPost(sortedPosts);
        setPostCount(res.data.length);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [username]);
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={account.avatar}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">{postCount}</span>
                        <span className="description">Posts</span>
                      </div>
                      <div>
                        <span className="heading"> {listFollowers.length}</span>
                        <span className="description">Followers</span>
                      </div>
                      <div>
                        <span className="heading"> {listFollowing.length}</span>
                        <span className="description">Following</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>{account.displayname}</h3>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Posts</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <div className="col-sm-12">
              {listPost.map((post) => (
                        <ListPost post={post} />
                      ))}
                    </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
