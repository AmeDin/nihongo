import React, { Component } from 'react'
import { Container, Card, CardTitle, CardBody,
     CardSubtitle, Button, Form, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getAllAlphabets, randomAlphabet } from '../../actions/alphabetActions';
import PropTypes from 'prop-types';
import MultiToggle from 'react-multi-toggle-extra';
import { TimelineLite } from 'gsap/all';
import CSSPlugin from 'gsap/CSSPlugin';

const C = CSSPlugin;

export class AllAlphabet extends Component {

    constructor(props){
      super(props);
      this.tlCorrect = new TimelineLite({ paused:true });
      this.tlWrong = new TimelineLite({ paused:true });
      this.state = {
          guess: '',
          level: 1,
          groupSize: 3
      }
   }

    groupOptions = [
      {
        displayName: 'Easy',
        selectedDisplayName: 'Easy',
        value: 1
      },
      {
        displayName: 'Normal',
        selectedDisplayName: 'Normal',
        value: 2
      },
      {
        displayName: 'Hard',
        selectedDisplayName: 'Hard',
        value: 3
      },
    ];

    static propTypes = {
        getAllAlphabets: PropTypes.func.isRequired,
        alphabet: PropTypes.object.isRequired
    }

    componentDidMount(){
        const defaultSetting = {
            level: this.state.level
        }
        this.props.getAllAlphabets(defaultSetting);
        this.props.randomAlphabet();

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

    onGroupSizeSelect  = value => {
      this.setState({ level: value } , () => { 
        console.log(this.state.level) 
        this.props.getAllAlphabets({
          level: this.state.level
          });
      })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const answer = this.props.alphabet.randomAlphabet.jpName
        if(answer.toLowerCase() === this.state.guess.toLowerCase())
        {
            this.props.randomAlphabet()
            this.guessInput.value = ''
            this.tlCorrect.seek(0)
            this.tlCorrect.play()
        }else{
            this.tlWrong.seek(0)
            this.tlWrong.play()
        }
    }
  
    render() {
        
        console.log(this.props)
        const alphabet  = this.props.alphabet.randomAlphabet
       
        return (
          <div>
          <h2 ref={ h2 => this.correctGuess = h2 } className="guessPrompt">Correct!</h2>
          <h2 ref={ h2 => this.wrongGuess = h2 } className="guessPrompt">Wrong</h2>
            <Container style={{maxWidth:'440px', margin:'0 auto'}}>
              <MultiToggle
                options={this.groupOptions}
                selectedOption={this.state.level}
                onSelectOption={this.onGroupSizeSelect}
              />
              { alphabet !== undefined && alphabet !== null ?
              <Form onSubmit={this.onSubmit}>
              <Card key={alphabet._id}>
                    <CardTitle style={{margin:'auto', textAlign:'center', fontSize:'10em'}}>{alphabet.character}</CardTitle>
                    <CardBody>
                        <CardSubtitle><Input 
                                type="text"
                                name="name"
                                placeholder="Character Guess here"
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
    alphabet: state.alphabet
})

export default connect(mapStateToProps, { getAllAlphabets, randomAlphabet })(AllAlphabet);