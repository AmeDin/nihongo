import React, { Component } from 'react'
import { Container, Button, Card, CardImg, CardBody,
    CardTitle, CardSubtitle, CardGroup, Modal, ModalHeader, 
    ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getVocabulary, addVocabulary } from '../../actions/vocabularyActions';
import PropTypes from 'prop-types';

export class VocabularyAdmin extends Component {

    state = {
        modal: false,
        engName: '',
        jpName: '',
        hiragana: '',
        kanji: '',
        category: 'Various',
        fileImg: null
    }

    static propTypes = {
        getVocabulary: PropTypes.func.isRequired,
        vocabulary: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onChange = (e) => {
        this.setState({ 
            [e.target.name] : e.target.value
        });
    }
    onSelectChange = (e) => {
        this.setState({ 
            [e.target.name] : e.target.options[e.target.selectedIndex].text
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

        const newVocabulary = {
            engName: this.state.engName,
            jpName: this.state.jpName,
            hiragana: this.state.hiragana,
            kanji: this.state.kanji,
            category: this.state.category,
            file: this.state.fileImg
        }

        this.props.addVocabulary(newVocabulary)

        this.toggle();
    } 

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    getImage = (title) => {
        
    }

    componentDidMount(){
        this.props.getVocabulary();
    }
  
    render() {
      console.log(this.props)
      console.log(this.state)
      const { vocabularys } = this.props.vocabulary;
      return (
        <div>
          <Container>
                { this.props.isAuthenticated ? <Button 
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}>
                    Add Vocabulary
                </Button> : <h4 className="mb-3 ml-4">Login to manage</h4>
                }
              <CardGroup>
                      {vocabularys.map(({ _id, jpName, engName, img, hiragana, category }) => (
                          <Card key={_id} style={{minWidth:'200px', maxWidth:'200px', minHeight:'200px', maxHeight:'200px', margin:'0 auto'}}>
                              <CardImg style={{minWidth:'200px', maxWidth:'200px', minHeight:'200px', maxHeight:'200px', margin:'auto'}} src={img} fluid={true ? 1 : 0} alt="Card Image" />
                              <CardBody>
                                  <CardTitle>{engName}</CardTitle>
                                  <CardSubtitle>{jpName}</CardSubtitle>
                                  <CardTitle>{hiragana}</CardTitle>
                                  <CardTitle>{category}</CardTitle>
                              </CardBody>
                          </Card>
                      ))}
              </CardGroup>
          </Container>
          <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Add to Vocabulary</ModalHeader>
            <ModalBody>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="engName">Name</Label>
                        <Input 
                            type="text"
                            name="engName"
                            id="engName"
                            placeholder="English Name"
                            onChange={this.onChange}
                            />
                        <Label for="jpName">JpName</Label>
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
                         <Label for="hiragana">Hiragana</Label>
                         <Input 
                             type="text"
                             name="hiragana"
                             id="hiragana"
                             placeholder="Hiragana"
                             onChange={this.onChange}
                          />
                     </FormGroup>
                     <FormGroup>
                    <Label for="category">Category</Label>
                        <Input 
                            type="select" 
                            name="category" 
                            id="category"
                            onChange={this.onSelectChange}>
                            <option>Various</option>
                            <option>Food</option>
                            <option>Animal</option>
                            <option>Color</option>
                            <option>Weather</option>
                        </Input>
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
                            Add Vocabulary
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
    vocabulary: state.vocabulary,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getVocabulary, addVocabulary })(VocabularyAdmin);
