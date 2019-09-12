import React, { Component } from 'react'
import { Container, Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Form, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getVocabulary, randomVocabulary } from '../../actions/vocabularyActions';
import PropTypes from 'prop-types';
import SkipAndHintModal from './SkipAndHintModal'
import successAnswer from '../../img/gif/success.gif'
import fail from '../../img/gif/fail.gif'

export class VocabularyCard extends Component {

    state = {
        guess: ''
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

    onSubmit = (e) => {
        e.preventDefault();

        const answer = this.props.vocabulary.randomVocabulary.jpName
        const jpAnswer = this.props.vocabulary.randomVocabulary.hiragana
        console.log(this.state)
        console.log(answer)
        if(answer.toLowerCase() === this.state.guess.toLowerCase() ||
          jpAnswer === this.state.guess)
        {
          this.promptVerification(true)
        }else{
          this.promptVerification(false)
        }
    } 

    promptVerification = (success) => {
      var duration = 0;
      if(success){
          document.querySelector("#response").src = successAnswer
          duration = 2500
      }else{
          document.querySelector("#response").src = fail
          duration = 1500
      }
      document.querySelector(".tick-overlay").style.display = "flex"
      setTimeout(function() { 
          document.querySelector(".tick-overlay").style.display = "none"
          if(success){
              this.props.randomVocabulary()
              document.querySelector('#item').value = ''
          }
      }.bind(this), duration)
    };
  
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
                        <Button
                          style={{marginTop: '1rem'}}>Submit</Button>
                    </CardBody>
                </Card></Form>
                : <Card>Empty</Card>}
            </Container>
            <div className='tick-overlay'>
                <img id="response" src={successAnswer} alt="success" />;
            </div>
          </div>
        )
    }
  }

const mapStateToProps = (state) => ({
    vocabulary: state.vocabulary
})

export default connect(mapStateToProps, { getVocabulary, randomVocabulary })(VocabularyCard);