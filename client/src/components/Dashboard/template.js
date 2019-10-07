import React from 'react';
import NavBar from './navbar';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col, CardImgOverlay } from 'reactstrap';
import "./dashboard.css"
import {templates} from '../../resume-templates/template'

export default class Template extends React.Component {
  constructor(props) {
    super(props);

    this.selectTemplate = this.selectTemplate.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.state = {
      page: 0,
      template: ''
    }
  } 

  selectTemplate(e){
    console.log(e.target.value)
    this.setState({
      template: this.state.template = e.target.value,
      page: this.state.page += 1
    })

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
    
  }

  firstPage(){
    return(
      <h1>Hey</h1>
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
                      <Button color="primary" onClick={e => this.selectTemplate(e)} value={template.name}>SELECT</Button>
                    </div>
                  </CardImgOverlay>
                </Card>
                </Col>
              })}
              
            </Row>
          </Container> }
          
          {page == 1 && this.firstPage()}

          {page > 0 && <Button onClick={e => this.setState({ page: this.state.page -= 1})}>Back</Button>}
          {/* {page < 2 && <Button onClick={e => this.nextPage(e)}>Next</Button>} */}
      </div>
    );
  }
}