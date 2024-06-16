/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from "react";
import UserService from "services/UserService";
import {
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function Tables() {
  const [load, setload] = useState(false);
  const [listUser, setlistUser] = useState([]);
  const token = localStorage.getItem("accessToken");
  // const handleLoad = () => {
  //   setload(!load);
  // };
  const toast = useToast();
  const addToast = (title) => {
    toast({
      title: title,
      position: "top-right",
      isClosable: true,
    });
  };
  const BanUser = (userID) => {
    UserService.BanUser(token, userID)
      .then((res) => {
        setload(!load);
        addToast("Ban Success");
      })
      .catch((err) => {
        console.error("Error ban user", err);
      });
  };
  const UnBanUser = (userID) => {
    UserService.UnBanUser(token, userID)
      .then((res) => {
        setload(!load);
        addToast("UnBan Success");
      })
      .catch((err) => {
        console.error("Error ban user", err);
      });
  };
  useEffect(() => {
    UserService.getAllUser(token)
      .then((res) => {
        setlistUser(res.data);
      })
      .catch((err) => {
        console.error("get all user", err);
      });
  }, [load]);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="">
                <Row className="justify-content-between align-items-center mb-0">
                  <Col className="">
                    <h3 className="mb-0">Users</h3>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <NavLink to="/admin/users/addUser">
                      <Button>New User</Button>
                    </NavLink>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">UserName</th>
                    <th scope="col">DisplayName</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {listUser.map((user) => (
                    <tr>
                      <th>{user.id}</th>
                      <td>
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                          >
                            <img alt="..." src={user.avatar} />
                          </a>
                        </Media>
                      </td>
                      <td>{user.username}</td>
                      <td>{user.displayname}</td>
                      <td>{user.phone}</td>
                      <td>
                        {user.status === 2 ? (
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            InActive
                          </Badge>
                        ) : (
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                            Active
                          </Badge>
                        )}
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            {user.status === 1 ? (
                              <DropdownItem onClick={() => BanUser(user.id)}>
                                Ban User
                              </DropdownItem>
                            ) : (
                              <DropdownItem onClick={() => UnBanUser(user.id)}>
                                UnBan User
                              </DropdownItem>
                            )}

                            <DropdownItem onClick={(e) => e.preventDefault()}>
                              Another action
                            </DropdownItem>
                            <DropdownItem onClick={(e) => e.preventDefault()}>
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        {/* Dark table */}
      </Container>
    </>
  );
}
