import React from 'react';
import axios from 'axios';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './home.css'

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
      submitted: false,
      loading: false,
      isLogin: false
    };
  }

  handleChange(input, value){
    this.setState({
      [input] : value
    });
  }

  handleSubmit(e){
    e.preventDefault();

    const {email, password} = this.state;
    const {history} = this.props;
    const user = {
      email: email,
      password: password
    }
    
    axios.post('/api/users/login', user)
          .then(function(response){
            if(response.status == 200){
               history.push({
                 pathname: '/main_dashboard',
                 state: {
                   username: response.data.user.username
                 }
                });
            }
            // console.log(response.data.user.username);
          })
          .catch(function(error){
            console.log(error)
          })
    
      this.setState({
        email: '',
        password: '',
        submitted: true
      })
    
    
  }

  render() {
    const {email, password, isLogin} = this.state;
    
    return (
        <Form style={{paddingTop: '30px'}} onSubmit={e => this.handleSubmit(e)}>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input 
                    type="email"
                    name="email" 
                    id="exampleEmail"
                    placeholder="Your email" 
                    value={email}
                    required
                    onChange = {e => this.handleChange('email', e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input 
                    type="password" 
                    name="password" 
                    id="examplePassword" 
                    placeholder="Your password" 
                    value={password}
                    required
                    onChange = {e => this.handleChange('password', e.target.value)}
                    />
            </FormGroup>
            
            <Button className="btn" color="primary">Sign In</Button>
        </Form>
    );
  }
}

export default withRouter(SignIn);