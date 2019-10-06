import React from 'react';
import NavBar from './navbar';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col, CardImgOverlay } from 'reactstrap';
import "./dashboard.css"
import {templates} from '../../resume-templates/template'

export default class Template extends React.Component {
  constructor(props) {
    super(props);
  } 

  render() {  
    console.log(templates)
    return (
      <div>
          <Container>
            <Row>
              {templates.map((template, key) => {
                return <Col md="4" key={template.id}>
                <Card inverse className="cards" className="imgOverlay">
                  <CardImg width="100%" src={template.img} alt={`${template.name} template`} />
                  <CardImgOverlay>
                    <div className="textOverlay">
                      <CardTitle>{template.name}</CardTitle>
                      <Button color="primary">SELECT</Button>
                    </div>
                    {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                    <CardText>  */}
                      {/* <small className="text-muted">Last updated 3 mins ago</small>
                    </CardText> */}
                  </CardImgOverlay>
                  {/* <CardTitle>{template.name}</CardTitle> */}
                </Card>
                </Col>
              })}
              
            </Row>
          </Container>
      </div>
    );
  }
}