import React, { Component } from 'react'
import { Container, Button, Card, CardImg, CardBody,
    CardTitle, CardSubtitle, CardGroup, Modal, ModalHeader, 
    ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getSentences } from '../../actions/sentenceActions';
import PropTypes from 'prop-types';
import { addSentence } from '../../actions/sentenceActions'

export class SentenceAdmin extends Component {

    state = {
        modal: false,
        engName: '',
        jpName: '',
        hiragana: '',
        fileImg: null
    }

    static propTypes = {
        getSentences: PropTypes.func.isRequired,
        sentence: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onChange = (e) => {
        this.setState({ 
            [e.target.name] : e.target.value
        });
    }

    fileOnChange = (e) => {
        console.log(e.target.files[0])
        let file = e.target.files[0]
        this.setState({ fileImg: file }, () => { console.log(this.state.fileImg) });
        console.log(this.state)
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newSentence = {
            engName: this.state.engName,
            jpName: this.state.jpName,
            hiragana: this.state.hiragana,
            file: this.state.fileImg
        }

        this.props.addSentence(newSentence)

        this.toggle();
    } 

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount(){
        this.props.getSentences();
    }
  
    render() {
      console.log(this.props)
      console.log(this.state)
      const { sentences } = this.props.sentence;
      return (
        <div>
          <Container>
                { this.props.isAuthenticated ? <Button 
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}>
                    Add Sentence
                </Button> : <h4 className="mb-3 ml-4">Login to manage</h4>
                }
              <CardGroup>
                      {sentences.map(({ _id, jpName, engName, img, hiragana }) => (
                          <Card key={_id} style={{minWidth:'200px', maxWidth:'200px', margin:'0 auto'}}>
                              <CardImg style={{margin:'auto'}} src={img} fluid={true ? 1 : 0} alt="Card Image" />
                              <CardBody>
                                  <CardTitle>{engName}</CardTitle>
                                  <CardSubtitle>{jpName}</CardSubtitle>
                                  <CardTitle>{hiragana}</CardTitle>
                              </CardBody>
                          </Card>
                      ))}
              </CardGroup>
          </Container>
          <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Add to Sentence</ModalHeader>
            <ModalBody>
                <Form onSubmit={this.onSubmit}>
                <FormGroup>
                        <Label for="engName">Sentence in English</Label>
                        <Input 
                            type="text"
                            name="engName"
                            id="engName"
                            placeholder="English sentence"
                            onChange={this.onChange}
                            />
                        <Label for="jpName">Sentence in Romaji</Label>
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            type="text"
                            name="jpName"
                            id="jpName"
                            placeholder="Japanese Name(Romaji)"
                            onChange={this.onChange}
                         />
                     </FormGroup>
                     <FormGroup>
                         <Label for="hiragana">Sentence in Japanese</Label>
                         <Input 
                             type="text"
                             name="hiragana"
                             id="hiragana"
                             placeholder="Hiragana"
                             onChange={this.onChange}
                          />
                     </FormGroup>
                     <FormGroup>
                        <Input 
                             type="file"
                             name="imgfile"
                             id="imgfile"
                             placeholder="Upload image"
                             onChange={this.fileOnChange}
                          />
                        <Button 
                            color="dark"
                            style={{marginTop: '2rem'}}
                            block>
                            Add Sentence
                        </Button>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    sentence: state.sentence,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getSentences, addSentence })(SentenceAdmin);
