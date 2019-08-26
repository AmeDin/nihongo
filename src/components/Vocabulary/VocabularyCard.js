import React, { Component } from 'react'
import { Container, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Form, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getVocabulary, randomVocabulary } from '../../actions/vocabularyActions';
import PropTypes from 'prop-types';
import SkipAndHintModal from './SkipAndHintModal'

export class VocabularyCard extends Component {

    state = {
        guess: '',
        validateText: ''
    }

    static propTypes = {
        getVocabulary: PropTypes.func.isRequired,
        vocabulary: PropTypes.object.isRequired
    }

    componentDidMount(){
        this.props.getVocabulary();
        this.props.randomVocabulary();
    }

    onChange = (e) => {
        this.setState({ 
            guess : e.target.value
        });
    }

    updateValidateText = (value) => {
        this.setState({ 
          validateText : value
      });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const answer = this.props.vocabulary.randomVocabulary.jpName
        const jpAnswer = this.props.vocabulary.randomVocabulary.hiragana
        console.log(this.state)
        console.log(answer)
        if(answer.toLowerCase() === this.state.guess.toLowerCase() ||
          jpAnswer === this.state.guess)
        {
          this.updateValidateText('Correct')
          document.getElementById('validateText').style.display = 'block'
          setTimeout(function() { //Start the timer
            this.props.randomVocabulary()
            this.updateValidateText('')
            document.getElementById('item').value = ''
            document.getElementById('validateText').style.display = 'none'
        }.bind(this), 500)
        }else{
          this.updateValidateText('Wrong')
        }
    } 
  
    render() {
        
        const vocabulary  = this.props.vocabulary.randomVocabulary
       
        return (
          <div>
            <Container style={{maxWidth:'440px', margin:'0 auto'}}>
              <SkipAndHintModal />
              { vocabulary !== undefined && vocabulary !== null ?
              <Form onSubmit={this.onSubmit}>
              <Card key={vocabulary._id}>
                    <CardImg top style={{margin:'auto'}} src={vocabulary.img} fluid={true ? 1 : 0} alt="Card Image" />
                    <CardBody>
                        <CardTitle>{vocabulary.engName}</CardTitle>
                        <CardSubtitle><Input 
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Romaji Guess here"
                                onChange={this.onChange}
                                style={{margin:'auto', textAlign:'center'}} 
                                /></CardSubtitle>
                        <CardText id='validateText' style={{display: 'none'}}>{this.state.validateText}</CardText>
                        <Button
                          style={{marginTop: '1rem'}}>Submit</Button>
                    </CardBody>
                </Card></Form>
                
                 : <Card>Empty</Card>}
            </Container>
          </div>
        )
    }
  }

const mapStateToProps = (state) => ({
    vocabulary: state.vocabulary
})


export default connect(mapStateToProps, { getVocabulary, randomVocabulary })(VocabularyCard);