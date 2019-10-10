import React from 'react';
import NavBar from './navbar';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col, CardImgOverlay,
  Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import "./dashboard.css"
import {templates} from '../../resume-templates/template';
import PDF from './pdf';

export default class Template extends React.Component {
  constructor(props) {
    super(props);

    this.selectTemplate = this.selectTemplate.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.state = {
      page: 0,
      template: '',
      backgroundImage: '',
      profile: '',
      imageUrl: '',
      name: '',
      job: '',
      email: '',
      phone: '',
      address: '',
      summary: '',
      url: ''
    }

    this.createResume = this.createResume.bind(this);
    this.imageReader = this.imageReader.bind(this)
  } 

  selectTemplate(background, e){
    console.log(e.target.value)
    this.setState({
      template: this.state.template = e.target.value,
      page: this.state.page += 1,
      backgroundImage: this.state.backgroundImage = background 
    })

    console.log(this.state)
  }

  createResume(e){
    this.setState({
      [e.target.name]: e.target.value
    })

    // console.log(this.state.job, this.state.name)
  }

  imageReader(e){
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    
    console.log(file)

    reader.onloadend = () => {
      this.setState({
        profile: file,
        imageUrl: reader.result
      })
    }

    reader.readAsDataURL(file)

    console.log(this.state)
  }

  nextPage(e){
    const {template} = this.state;
    if(this.state.page == 0){
      if(template == ''){
        console.log('Please choose a template')
      } else{
        this.setState({
          page: this.state.page += 1
        })
      }
    }
    this.setState({
      page: this.state.page += 1
    })
  }
  
  switchPage(){
    const {page} = this.state;
    return(
      <div>
        {page > 0 && <Button style={{display: 'inline', marginRight: '20px'}} onClick={e => this.setState({ page: this.state.page -= 1})}>Back</Button>}
        {page < 4 && <Button style={{display: 'inline'}} onClick={e => this.nextPage(e)}>Next</Button>}
      </div>
    )
  }

  mainPage(){
    const {page} = this.state;
    return(
      <Container>
        <Row>
          <Col md="6">
          <Form style={{color: '#fff'}}>
              <h3 style={{marginBottom: '50px'}}>Your Personal Information</h3>
              <FormGroup>
              <Label for="exampleFile">Your Profile Picture</Label>
              <Input 
                type="file" 
                name="profile" 
                id="exampleFile" 
                onChange={e => this.imageReader(e)}
                />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">What's your full name?</Label>
                  <Input 
                    type="text" 
                    name="name" 
                    id="exampleEmail" 
                    placeholder="Your name" 
                    onKeyUp={e => this.createResume(e)}
                    />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">What's your current job position?</Label>
                  <Input 
                    type="text" 
                    name="job" 
                    id="examplePassword" 
                    placeholder="Your job position" 
                    onKeyUp={e => this.createResume(e)}
                    />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">What's your email?</Label>
                  <Input 
                    type="email" 
                    name="email" 
                    id="examplePassword" 
                    placeholder="Your email" 
                    onKeyUp={e => this.createResume(e)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">What's your phone number?</Label>
                  <Input 
                    type="text" 
                    name="phone" 
                    id="exampleEmail" 
                    placeholder="Your phone number" 
                    onKeyUp={e => this.createResume(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleAddress">What's your home address?</Label>
              <Input 
                type="text" 
                name="address" 
                id="exampleAddress" 
                placeholder="Your home address"
                onKeyUp={e => this.createResume(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Tell us about yourself</Label>
              <Input 
                type="textarea" 
                name="summary" 
                id="exampleText" 
                onKeyUp={e => this.createResume(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Your website</Label>
              <Input 
                type="url" 
                name="url" 
                id="exampleText" 
                onKeyUp={e => this.createResume(e)}
              />
            </FormGroup>
          </Form>
          {this.switchPage()}
          </Col>
          <Col md="6">
            {this.pdf()}
          </Col>
        </Row>
      </Container>
    )
  }

  pdf(){
    return(
      <PDF 
        profile={this.state.imageUrl}
        backgroundImage={this.state.backgroundImage}
        name={this.state.name}
        job={this.state.job}
        email={this.state.email}
        phone={this.state.phone}
        address={this.state.address}
        summary={this.state.summary}
        url={this.state.url}
      />
    )
  }

  secondFormPage(){
    const {page} = this.state;
    return(
      <Container>
        <Row>
          <Col md="6">
          <Form style={{color: '#fff'}}>
            <h3 style={{marginBottom: '50px'}}>Your Education</h3>
            <FormGroup>
              <Label for="exampleAddress">Where do you study?</Label>
              <Input 
                type="text" 
                name="institution" 
                id="exampleAddress" 
                placeholder="Your education institution"
                onKeyUp={e => this.createResume(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">What is your study program?</Label>
              <Input 
                type="text" 
                name="study_program" 
                id="exampleText"
                placeholder="Your study program" 
                onKeyUp={e => this.createResume(e)}
              />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Which city does it located?</Label>
                  <Input 
                    type="text" 
                    name="study_city" 
                    id="exampleEmail" 
                    placeholder="City of education institution" 
                    onKeyUp={e => this.createResume(e)}
                    />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Which country does it located?</Label>
                  <Input 
                    type="text" 
                    name="study_country" 
                    id="examplePassword" 
                    placeholder="Country of education institution" 
                    onKeyUp={e => this.createResume(e)}
                    />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">What's your email?</Label>
                  <Input 
                    type="email" 
                    name="email" 
                    id="examplePassword" 
                    placeholder="Your email" 
                    onKeyUp={e => this.createResume(e)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">What's your phone number?</Label>
                  <Input 
                    type="text" 
                    name="phone" 
                    id="exampleEmail" 
                    placeholder="Your phone number" 
                    onKeyUp={e => this.createResume(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
          {this.switchPage()}
          </Col>
          <Col md="6">
            {this.pdf()}
          </Col>
        </Row>
      </Container>
      
    )
  }

  render() {  
    console.log(templates)
    const {page} = this.state;
    return (
      <div>
          {page == 0 && 
          <Container>
            <Row>
              {templates.map((template, key) => {
                return <Col md="4" key={template.id}>
                <Card inverse className="cards" className="imgOverlay" name="template">
                  <CardImg width="100%" src={template.img} alt={`${template.name} template`} />
                  <CardImgOverlay>
                    <div className="textOverlay">
                      <CardTitle>{template.name}</CardTitle>
                      <Button color="primary" onClick={e => this.selectTemplate(template.backgroundImage, e)} value={template.name}>SELECT</Button>
                    </div>
                  </CardImgOverlay>
                </Card>
                </Col>
              })}
              
            </Row>
          </Container> }

          {page == 1 && this.mainPage()}
          {page == 2 && this.secondFormPage()}
          {/* {page < 2 && <Button onClick={e => this.nextPage(e)}>Next</Button>} */}
      </div>
    );
  }
}