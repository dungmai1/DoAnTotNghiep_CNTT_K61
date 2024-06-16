import { Avatar, Center, Flex, WrapItem } from "@chakra-ui/react";
import Header from "components/Headers/Header";
import ListPost from "components/ListPost/ListPost";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import LikeService from "services/LikeService";
import PostService from "services/PostService";

export default function Tables() {
  const [load, setload] = useState(false);
  const [listPost, setListPost] = useState([]);
  const token = localStorage.getItem("accessToken");

  //   const handleLoad = () => {
  //     setload(!load);
  //   };
  useEffect(() => {
    PostService.getAllPost(token)
      .then((res) => {
        const sortedPosts = res.data.sort((a, b) => {
          return new Date(b.postTime) - new Date(a.postTime);
        });
        setListPost(sortedPosts);
        console.log("Arr", sortedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [load]);
  return (
    <>
      <Header />

      <Container className="mt--7" fluid>
        <Center>
        <Row className="justify-content-md-center mb-6">
          <Col>
            <Button colorScheme="blue"  >List Post Active</Button>
          </Col>
          {/* <Col>
            <Button colorScheme="blue">Button</Button>
          </Col>
          <Col>
            <Button colorScheme="blue">Button</Button>
          </Col> */}
        </Row>
        </Center>
        <div className="row">
          {listPost.map((post) => (
            <div className="col-sm-4">
              <ListPost post={post} load={load} setload={setload} />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
