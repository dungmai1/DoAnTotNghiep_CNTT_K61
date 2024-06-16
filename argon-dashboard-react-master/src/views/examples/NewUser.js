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
import Header from "components/Headers/Header";
import { Center } from "@chakra-ui/react";
import { useState } from "react";
import CometChatService from "services/CometChatService";
import RegisterService from "services/RegisterService";
import { useNavigate } from "react-router-dom";
export default function NewUser() {
    const [dataRegister, setdataRegister] = useState("");
    const handleChange = (e) => {
      setdataRegister({ ...dataRegister, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate();
    const requestData = {
      metadata: {
        "@private": {
          email: dataRegister.username,
          contactNumber: dataRegister.phone,
        },
      },
      uid: dataRegister.username,
      name: dataRegister.displayname,
      avatar:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-1.jpg",
    };
    const CometChat = async () => {
      try {
        const res = await CometChatService.CreateUser(requestData);
        console.log("Create Comet Chat Success");
      } catch (error) {
        console.error("Error Comet Chat", error);
      }
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await RegisterService.Register(dataRegister);
        console.log("Register Success");
        await CometChat();
        alert("Register and Comet Chat Success");
        navigate("/admin/users")
      } catch (error) {
        alert(error.response?.data?.message || "An error occurred");
      }
    };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1 center" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add new User</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Ex: dungmai1"
                            type="text"
                            name="username"
                            value={dataRegister.username}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            DisplayName
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-displayname"
                            placeholder="Ex: Mai Danh Dũng"
                            type="text"
                            name="displayname"
                            value={dataRegister.displayname}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            placeholder="Ex: 0328657868"
                            type="text"
                            name="phone"
                            value={dataRegister.phone}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-password"
                          >
                            Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-password"
                            placeholder="Password"
                            type="text"
                            name="password"
                            value={dataRegister.password}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Center>
                      <Button onClick={handleSubmit}>Register</Button>
                    </Center>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
