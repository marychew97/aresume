import React from 'react';
import NavBar from './navbar';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col, CardImgOverlay } from 'reactstrap';
import "./dashboard.css"

export default class Template extends React.Component {
  constructor(props) {
    super(props);
  } 

  render() {  
    return (
      <div>
          <Container>
            <Row>
              <Col md="4">
              <Card inverse className="cards">
                <CardImg width="100%" src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Card image cap" />
                <CardImgOverlay>
                  <CardTitle>Card Title</CardTitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                  <CardText>
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </CardText>
                </CardImgOverlay>
              </Card>
              </Col>
              <Col md="4">
              <Card inverse className="cards">
                <CardImg width="100%" src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Card image cap" />
                <CardImgOverlay>
                  <CardTitle>Card Title</CardTitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                  <CardText>
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </CardText>
                </CardImgOverlay>
              </Card>
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}