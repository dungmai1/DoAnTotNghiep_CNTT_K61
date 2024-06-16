import { Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Table,
} from "reactstrap";

export default function LoadDetect() {
  return (
    <Col>
      <Card className="shadow">
        <CardHeader className="">
          <Row className="justify-content-between align-items-center mb-0">
            <Col className="">
              <h3 className="mb-0">Users</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            <Card>
              <CardBody>
                <Image src="https://nupet.vn/wp-content/uploads/2023/10/ngo-nghinh-anh-meo-cute-nupet-19.jpg" boxSize='200px'/>
              </CardBody>
            </Card>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Col>
  );
}
