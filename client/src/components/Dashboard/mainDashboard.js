import React from 'react';
import {Router, Route, Switch, withRouter, BrowserRouter, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Alert, Spinner, Card,CardTitle, CardImg, CardText, CardBody, CardSubtitle, Container, CardImgOverlay } from 'reactstrap';
import NavBar from './navbar';
import classnames from 'classnames';
import Dashboard from './dashboard'
import Template from './template'
import "./dashboard.css"

export default class MainDashboard extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

  render() {
    const username = this.props.location.state.username;  
    return (
      <div>
        <NavBar username={username}/>
        <div className="dashboard">
        <Nav tabs className="nav">
          <NavItem className="navitem">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
              style={{cursor: 'pointer'}}
            >
              My Resume
            </NavLink>
          </NavItem>
          <NavItem className="navitem">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
              style={{cursor: 'pointer'}}
            >
              Create Resume
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="tabcontent" activeTab={this.state.activeTab}>
          <TabPane className="tabpane" tabId="1">
            <Row>
              <Col sm="12">
              <Container>
                <Row>
                  <Col md="4">
                  <Card inverse className="cards">
                    <CardImg width="100%" src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Card image cap" />
                    <CardImgOverlay>
                      <NavLink><FontAwesomeIcon icon={faEye} className="icon"/></NavLink>
                      <br/>
                      <NavLink><FontAwesomeIcon icon={faEdit} className="icon"/></NavLink>
                      <br/>
                      <NavLink><FontAwesomeIcon icon={faTrashAlt} className="icon"/></NavLink>
                    </CardImgOverlay>
                  </Card>
                  </Col>
                  <Col md="4">
                  <Card className="cards">
                    <CardBody>
                      <CardTitle className="cardTitle">
                        <h3>Create your resume here</h3>
                      </CardTitle>
                      <NavLink onClick={() => { this.toggle('2'); }}>
                        <Button className="btn">Create</Button>
                      </NavLink>
                    </CardBody>
                  </Card>
                  </Col>
                </Row>
              </Container>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Template/>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        </div>
      </div>
    );
  }
}