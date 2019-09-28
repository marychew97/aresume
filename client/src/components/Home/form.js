import React from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Alert, Spinner } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import classnames from 'classnames';
import resumelogo from '../../images/resumelogo.png';
import './home.css'
import SignIn from './signin';

export default class SignInUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      activeTab: '1',
      username: '',
      email: '',
      password: '',
      confirmpassword: '', 
      submitted: false,
      loading: false
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleChange(input, value){
    this.setState({
      [input] : value
    });
  }

  handleSubmit(e){
    e.preventDefault();

    const {username, email, password, confirmpassword} = this.state;
    const user = {
      username: username,
      email: email,
      password: password
    }
    if(password !== confirmpassword){
      alert('Password not matched');
    } else{
      axios.post('/api/users', user)
          .then(function(response){
            
            console.log(response);
            console.log('Submitted')
          })
          .catch(function(error){
            console.log(error)
          })
      
      // console.log(user)
      this.setState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '', 
        submitted: true
      })
    }
    
  }

  render() {
    const {username, email, password, confirmpassword} = this.state;
    return (
      <div className="form">
        <div className="heading_container">
          <img src={resumelogo} alt="aresume logo" className="resumeLogo"/>
          <h6 className="heading">Build your very own resume with Augmented Reality</h6>
        </div>
        
        <Nav tabs className="nav">
          <NavItem className="navitem">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
              style={{cursor: 'pointer'}}
            >
              SIGN UP
            </NavLink>
          </NavItem>
          <NavItem className="navitem">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
              style={{cursor: 'pointer'}}
            >
              SIGN IN
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="tabcontent" activeTab={this.state.activeTab}>
          <TabPane className="tabpane" tabId="1">
            <Row>
              <Col sm="12">
                {this.state.submitted === true ? 
                  <Alert color="primary" style={{marginTop: '10px'}}>
                    User account created successfully!
                  </Alert>
                  : ''
                }
              
              <Form style={{paddingTop: '30px'}} onSubmit={e => this.handleSubmit(e)}>
                <FormGroup>
                  <Label for="exampleEmail">Username</Label>
                  <Input 
                    type="text" 
                    name="username" 
                    id="exampleEmail" 
                    placeholder="Your username" 
                    value={username}
                    required
                    onChange={e => this.handleChange('username', e.target.value)}/>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input 
                    type="email" 
                    name="email" 
                    id="exampleEmail" 
                    placeholder="Your email" 
                    value={email}
                    required
                    onChange={e => this.handleChange('email', e.target.value)}/>
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input 
                    type="password" 
                    name="password" 
                    id="examplePassword" 
                    placeholder="Your Password" 
                    value={password}
                    required
                    onChange={e => this.handleChange('password', e.target.value)}/>
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Confirm Password</Label>
                  <Input 
                    type="password" 
                    name="confirmpassword" 
                    id="examplePassword" 
                    placeholder="Confirm Password" 
                    value={confirmpassword}
                    required
                    onChange={e => this.handleChange('confirmpassword', e.target.value)}/>
                </FormGroup>
                
                <Button className="btn" color="primary">Sign Up {this.state.loading === true ? <Spinner size="sm" color="light" /> : ''}</Button>
              </Form>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <SignIn {...this.props}/>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}