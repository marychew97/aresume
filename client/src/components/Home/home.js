import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';
import SignInUpForm from './form';
import './home.css';
import wallpaper from '../../images/wallpaper.jpeg'

class Home extends React.Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return (
    <div className="container">
      <Container  fluid={true}>
      <Row>
        <Col md="3" xs={false}></Col>
        <Col md="6">
          <SignInUpForm {...this.props}/>
        </Col>
        <Col md="3" xs={false}></Col>
      </Row>
    </Container>
    </div>
      );
  }
}

export default Home;