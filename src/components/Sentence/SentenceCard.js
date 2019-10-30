import React, { Component } from 'react'
import { Container, Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Form, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getSentences, randomSentence } from '../../actions/sentenceActions';
import PropTypes from 'prop-types';
// import SkipAndHintModal from './SkipAndHintModal'
import { TimelineLite } from 'gsap/all';
import CSSPlugin from 'gsap/CSSPlugin';

const C = CSSPlugin;

export class SentenceCard extends Component {

    constructor(props){
      super(props);
          this.tlCorrect = new TimelineLite({ paused:true });
          this.tlWrong = new TimelineLite({ paused:true });
          this.state = {
              guess: ''
          }
      }

    static propTypes = {
        getSentences: PropTypes.func.isRequired,
        sentence: PropTypes.object.isRequired
    }

    componentDidMount(){
        this.props.getSentences();
        this.props.randomSentence();

        this.tlCorrect
          .set(this.correctGuess, { autoAlpha: 0 })
          .from(this.correctGuess, 2, { top: 100, autoAlpha: 0 })
          .to(this.correctGuess, 2, { opacity: 0, autoAlpha: 0 })

        this.tlWrong
          .set(this.wrongGuess, { autoAlpha: 0 })
          .from(this.wrongGuess, 2, { top: 100, autoAlpha: 0 })
          .to(this.wrongGuess, 2, { opacity: 0, autoAlpha: 0 })
    }

    onChange = (e) => {
        this.setState({ 
            guess : e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const answer = this.props.sentence.randomSentence.jpName
        const jpAnswer = this.props.sentence.randomSentence.hiragana
        console.log(this.state)
        console.log(answer)
        if(answer.toLowerCase() === this.state.guess.toLowerCase() ||
          jpAnswer === this.state.guess)
        {
          this.tlCorrect.seek(0)
          this.tlCorrect.play()
          this.props.randomSentence()
          this.guessInput.value = ''
          
        }else{
          this.tlWrong.seek(0)
          this.tlWrong.play()
        }
    } 
  
    render() {
        
        const sentence  = this.props.sentence.randomSentence
       
        return (
          <div>
            <h2 ref={ h2 => this.correctGuess = h2 } className="guessPrompt">Correct!</h2>
            <h2 ref={ h2 => this.wrongGuess = h2 } className="guessPrompt">Wrong</h2>
            <Container style={{maxWidth:'440px', margin:'0 auto'}}>
              {/* <SkipAndHintModal /> */}
              { sentence !== undefined && sentence !== null ?
              <Form onSubmit={this.onSubmit}>
              <Card key={sentence._id}>
                    <CardImg top style={{margin:'auto', maxHeight:'400px'}} src={sentence.img} fluid={true ? 1 : 0} alt="Card Image" />
                    <CardBody>
                        <CardTitle>{sentence.engName}</CardTitle>
                        <CardSubtitle><Input 
                                type="text"
                                name="name"
                                placeholder="Form a sentence here"
                                onChange={this.onChange}
                                style={{margin:'auto', textAlign:'center'}} 
                                ref={(input) => { this.guessInput = input; }} 
                                autoFocus 
                                /></CardSubtitle>
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
    sentence: state.sentence
})

export default connect(mapStateToProps, { getSentences, randomSentence })(SentenceCard);