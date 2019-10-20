import React from 'react';
import axios from 'axios';
import {Router, Route, Switch, withRouter, BrowserRouter, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Table, Spinner, Card,CardTitle, CardImg, CardText, CardBody, CardSubtitle, Container, CardImgOverlay } from 'reactstrap';
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
          activeTab: '1',
          resumes: [],
          isLoading: true
        };
      }
      
    componentDidMount(){
      axios.get('/api/users/get_resume')
            .then(res => {
              this.setState({
                resumes: res.data,
                isLoading: false
              })
            })
          console.log(this.state)
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
    const {resumes, isLoading} = this.state;
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
                {isLoading === true ? <div style={{textAlign: 'center'}}><p style={{display: 'inline-block'}}>Loading resumes...</p>&nbsp;<Spinner color="primary" style={{display: 'inline-block'}}/></div> :
                resumes.length === 0 ? <p style={{textAlign: 'center'}}>No resumes found</p> : 
                <Table className="table">
                  <thead>
                    <tr>
                      {/* <th>No. </th> */}
                      <th>Resume</th>
                      <th>Link</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {resumes.map((resume, id) => {
                    return <tr>
                      <td>{resume.resumeName}</td>
                      <td><NavLink style={{padding: 0}} style={{cursor: 'pointer'}}>https://localhost:3000/test</NavLink></td>
                      <td><NavLink style={{padding: 0}}><FontAwesomeIcon icon={faEye} className="icon"/></NavLink></td>
                      <td><NavLink style={{padding: 0}}><FontAwesomeIcon icon={faEdit} className="icon"/></NavLink></td>
                      <td><NavLink style={{padding: 0}}><FontAwesomeIcon icon={faTrashAlt} className="icon"/></NavLink></td>
                    </tr>
                  })}
                  </tbody>
                </Table>
                }
                <NavLink onClick={() => { this.toggle('2'); }}>
                  <Button className="btn">Create</Button>
                </NavLink>
                <Link to="/scanner">
                  <Button className="btn">Scan</Button>
                </Link>
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