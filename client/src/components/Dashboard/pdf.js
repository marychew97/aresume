import React from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhoneAlt, faHome, faGlobe } from '@fortawesome/free-solid-svg-icons'
import ReactDOMServer from 'react-dom/server';
import canvg from 'canvg';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col, CardImgOverlay,
  Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './pdf.css'

class PDF extends React.Component{
    constructor(props){
      super(props);

      this.exportPdf = this.exportPdf.bind(this);

      // I set a canvas loaded boolean in the constructor
      this.canvLoaded = false;
      this.githubIcon = null;
    }
    // function to convert SVG to image. htmlString is optional
    // convertSVGToImage = () => {
    //   // if FontAwesome, run this next part
    //   let htmlString = ReactDOMServer.renderToStaticMarkup(
    //       <FontAwesomeIcon icon={faGithub} />);
    //   // for both FontAwesome and regular SVG:
    //   canvg(this.refs.canvas, htmlString);
    //   this.githubIcon = this.refs.canvas.toDataURL('image/png')
    // }

    // componentDidMount() {
    //   this.convertSVGToImage();
    // }

    exportPdf(){
      this.resume.save();
    } 

    render(){
      const {name, job, address, url, email, phone, summary, profile} = this.props;
        return (
          <div>
            {!this.canvLoaded && <canvas ref="canvas" style={{ display: 'none' }}>
            </canvas>}
            <Button onClick={this.exportPdf}>Export to PDF</Button>
            <PDFExport paperSize={'Letter'}
                fileName="resume.pdf"
                title=""
                subject=""
                keywords=""
                ref={(r) => this.resume = r}>
                    <div className="document" style={{
                      background: `url(${this.props.backgroundImage})`, 
                      backgroundPosition: 'center center', 
                      backgroundSize: '100%', 
                      backgroundRepeat: 'no-repeat'}}>
                        <Container>
                          <Row>
                            <Col md={4}>
                              {profile && <div className="imageDiv" style={{backgroundImage: `url(${profile})`}}></div>}
                              {/* {profile && <img src={profile} alt="profile picture" style={{width: '150px', height: '150px'}}/>} */}
                              <h5 style={{color: '#fff', textAlign: 'center'}}>{name}</h5>
                              {phone && <Container>
                                <Row>
                                  <Col md={3}>
                                    <FontAwesomeIcon icon={faPhoneAlt} style={{color: '#e1ce7a'}}/>
                                  </Col>
                                  <Col md={9}>
                                    <p style={{color: '#fff'}}>{phone}</p>
                                  </Col>
                                </Row>
                              </Container>}
                              {email && <Container>
                                <Row>
                                  <Col md={3}>
                                    <FontAwesomeIcon icon={faEnvelope} style={{color: '#e1ce7a'}}/>
                                  </Col>
                                  <Col md={9}>
                                    <p style={{color: '#fff'}}>{email}</p>
                                  </Col>
                                </Row>
                              </Container>}
                              {address && <Container>
                                <Row>
                                  <Col md={3}>
                                    <FontAwesomeIcon icon={faHome} style={{color: '#e1ce7a'}}/>
                                  </Col>
                                  <Col md={9}>
                                    <p style={{color: '#fff'}}>{address}</p>
                                  </Col>
                                </Row>
                              </Container>}
                              {url && <Container>
                                <Row>
                                  <Col md={3}>
                                    <FontAwesomeIcon icon={faGlobe} style={{color: '#e1ce7a'}}/>
                                  </Col>
                                  <Col md={9}>
                                    <p style={{color: '#fff'}}>{url}</p>
                                  </Col>
                                </Row>
                              </Container>}
                            </Col>
                            <Col md={8}>
                              <div>
                                
                              </div>
                              {job}
                              {summary}
                            </Col>
                          </Row>  
                        </Container>  
                            
                    </div>
                    
            </PDFExport>
          </div>
        )
    }
}

export default PDF;