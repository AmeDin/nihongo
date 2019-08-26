import React, { Component } from 'react'
import { Container, Button, Card, CardImg, CardBody,
    CardTitle, CardSubtitle, CardGroup, Modal, ModalHeader, 
    ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getShigotos } from '../../actions/shigotoActions';
import PropTypes from 'prop-types';
import { addShigoto } from '../../actions/shigotoActions'

export class ShigotoAdmin extends Component {

    state = {
        modal: false,
        engName: '',
        jpName: '',
        hiragana: '',
        fileImg: null
    }

    static propTypes = {
        getShigotos: PropTypes.func.isRequired,
        shigoto: PropTypes.object.isRequired,
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

        const newShigoto = {
            engName: this.state.engName,
            jpName: this.state.jpName,
            hiragana: this.state.hiragana,
            file: this.state.fileImg
        }

        this.props.addShigoto(newShigoto)

        this.toggle();
    } 

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount(){
        this.props.getShigotos();
    }
  
    render() {
      console.log(this.props)
      console.log(this.state)
      const { shigotos } = this.props.shigoto;
      return (
        <div>
          <Container>
                { this.props.isAuthenticated ? <Button 
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}>
                    Add Shigoto
                </Button> : <h4 className="mb-3 ml-4">Login to manage</h4>
                }
              <CardGroup>
                      {shigotos.map(({ _id, jpName, engName, img, hiragana }) => (
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
            <ModalHeader toggle={this.toggle}>Add to Shigoto</ModalHeader>
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
                            Add Shigoto
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
    shigoto: state.shigoto,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getShigotos, addShigoto })(ShigotoAdmin);
