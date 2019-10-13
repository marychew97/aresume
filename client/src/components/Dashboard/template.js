import React from 'react';
import NavBar from './navbar';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col, CardImgOverlay,
  Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import "./dashboard.css"
import {templates} from '../../resume-templates/template';
import PDF from './pdf';
import axios from 'axios';

export default class Template extends React.Component {
  constructor(props) {
    super(props);

    this.selectTemplate = this.selectTemplate.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.state = {
      page: 0,
      template: '',
      resumeName: '',
      backgroundImage: '',
      templateImg: '',
      profile: '',
      imageUrl: '',
      name: '',
      job: '',
      email: '',
      phone: '',
      address: '',
      summary: '',
      url: '',
      institution: '',
      study_program: '',
      study_city: '',
      study_country: '',
      startDate: null,
      endDate: null,
      presentDate: false,
      edu_achievement: ''
    }

    this.createResume = this.createResume.bind(this);
    this.imageReader = this.imageReader.bind(this);
    this.checkPresent = this.checkPresent.bind(this);
    this.inputDate = this.inputDate.bind(this);
    this.submitResume = this.submitResume.bind(this);
  } 

  selectTemplate(template, e){
    console.log(e.target.value)
    this.setState({
      template: this.state.template = e.target.value,
      page: this.state.page += 1,
      backgroundImage: this.state.backgroundImage = template.backgroundImage,
      templateImg: this.state.templateImg= template.img
    })

    console.log(this.state)
  }

  createResume(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  checkPresent(e){
    this.setState({
      presentDate: !this.state.presentDate
    })
    console.log(this.state.presentDate)
  }

  inputDate(e){
    this.setState({
      [e.target.name]: e.target.value
    })

    // if(this.state.presentDate === true){
    //   this.setState({
    //     endDate: "Present"
    //   })
    // }
    
    console.log(this.state)
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

  submitResume(e){
    e.preventDefault();
    const {
      profile,
      template,
      templateImg,
      resumeName,
      imageUrl,
      name, 
      email, 
      job, 
      phone, 
      address, 
      summary, 
      url,
      institution, 
      study_program, 
      study_city, 
      study_country, 
      startDate,
      edu_achievement, 
      presentDate, 
      endDate
    } = this.state;

    const resume = {
      template: template,
      templateImg: templateImg,
      resumeName: resumeName,
      imageUrl: imageUrl,
      name: name, 
      email: email, 
      job: job, 
      phone: phone, 
      address: address, 
      summary: summary, 
      url: url,
      institution: institution, 
      study_program: study_program, 
      study_city: study_city, 
      study_country: study_country, 
      startDate: startDate,
      edu_achievement: edu_achievement, 
      presentDate: presentDate, 
      endDate: endDate
    }

    axios.post('/api/users/create_resume', resume)
         .then(function(response){
           console.log(response);
           console.log('submitted')
         })
         .catch(error => {
           console.log(error)
         })
  }
  
  switchPage(){
    const {page} = this.state;
    return(
      <div>
        {page > 0 && <Button style={{display: 'inline', marginRight: '20px'}} onClick={e => this.setState({ page: this.state.page -= 1})}>Back</Button>}
        {page < 2 ?  
          <Button style={{display: 'inline'}} onClick={e => this.nextPage(e)}>Next</Button> :
          <Button style={{display: 'inline'}} onClick={e => this.submitResume(e)}>Submit</Button>}
      </div>
    )
  }

  mainPage(){
    const {profile, name, email, job, phone, address, summary, url, resumeName} = this.state;
    return(
      <Container>
        <Row>
          <Col md="6">
          <Form>
            <h3 style={{marginBottom: '50px'}}>Your Personal Information</h3>
            <FormGroup>
              <Label for="exampleEmail">Name your resume</Label>
              <Input 
                type="text" 
                name="resumeName" 
                id="exampleEmail" 
                placeholder="Your resume name" 
                value={resumeName}
                onChange={e => this.createResume(e)}
              />
            </FormGroup>
            <br/>
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
                    value={name}
                    onChange={e => this.createResume(e)}
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
                    value={job}
                    onChange={e => this.createResume(e)}
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
                    value={email} 
                    onChange={e => this.createResume(e)}
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
                    value={phone}
                    onChange={e => this.createResume(e)}
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
                value={address}
                onChange={e => this.createResume(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Tell us about yourself</Label>
              <Input 
                type="textarea" 
                name="summary" 
                id="exampleText" 
                value={summary}
                onChange={e => this.createResume(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Your website</Label>
              <Input 
                type="url" 
                name="url" 
                id="exampleText" 
                value={url}
                onChange={e => this.createResume(e)}
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
    const {institution, study_program, study_city, study_country, startDate,edu_achievement, presentDate, endDate} = this.state;
    return(
      <Container>
        <Row>
          <Col md="6">
          <Form>
            <h3 style={{marginBottom: '50px'}}>Your Education</h3>
            <FormGroup>
              <Label for="exampleAddress">Where do you study?</Label>
              <Input 
                type="text" 
                name="institution" 
                id="exampleAddress" 
                placeholder="Your education institution"
                value={institution}
                onChange={e => this.createResume(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">What is your study program?</Label>
              <Input 
                type="text" 
                name="study_program" 
                id="exampleText"
                placeholder="Your study program" 
                value={study_program}
                onChange={e => this.createResume(e)}
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
                    value={study_city}
                    onChange={e => this.createResume(e)}
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
                    value={study_country}
                    onChange={e => this.createResume(e)}
                    />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={5}>
                <FormGroup>
                  <Label for="examplePassword">Starting Date</Label>
                  <Input 
                    type="date" 
                    name="startDate" 
                    id="examplePassword" 
                    value={startDate}
                    onChange={e => this.inputDate(e)}
                  />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="exampleEmail">Ending Date</Label>
                  <Input 
                    type={presentDate === true ? "text" : "date"} 
                    name="endDate" 
                    id="exampleEmail" 
                    value={presentDate === true ? "Present" : endDate}
                    onChange={e => this.inputDate(e)}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup style={{marginLeft: "20px"}}>
                  <Input 
                    type="checkbox" 
                    name="presentDate" 
                    id="exampleEmail" 
                    value={presentDate}
                    onChange={e => this.checkPresent(e)}
                  />
                  <Label for="exampleEmail">Present</Label>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleText">Tell us about your achievement</Label>
              <Input 
                type="textarea" 
                name="edu_achievement" 
                id="exampleText" 
                value={edu_achievement}
                onChange={e => this.createResume(e)}
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
                      <Button color="primary" onClick={e => this.selectTemplate(template, e)} value={template.name}>SELECT</Button>
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