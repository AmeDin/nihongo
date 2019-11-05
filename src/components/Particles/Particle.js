import React, { Component } from 'react'
import { Container, Card, CardTitle, CardBody,
     CardSubtitle, Button, Form, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getParticles, randomParticle } from '../../actions/particleActions';
import PropTypes from 'prop-types';
import MultiToggle from 'react-multi-toggle-extra';
import { TimelineLite } from 'gsap/all';
import CSSPlugin from 'gsap/CSSPlugin';

const C = CSSPlugin;


export class Particle extends Component {

  constructor(props){
        super(props);
        this.tlCorrect = new TimelineLite({ paused:true });
        this.tlWrong = new TimelineLite({ paused:true });
        this.state = {
            guess: [''],
            level: 1,
            particles: [''],
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
        getParticles: PropTypes.func.isRequired,
        particle: PropTypes.object.isRequired
    }

    componentDidMount(){
        const defaultSetting = {
            level: this.state.level
        }
        this.props.getParticles(defaultSetting);
        this.props.randomParticle(()  => { console.log(this.props) }) ;

        console.log(this.props)
        // this.setState({ 
        //     particles : this.props.particle.randomParticle.particles
        // });

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
        console.log(e.target)
        let guess = [...this.state.guess]
        guess[e.target.dataset.id] = e.target.value
        this.setState({guess}, () => console.log(this.state.guess))
    }

    onGroupSizeSelect  = value => {
      this.setState({ level: value } , () => { 
        console.log(this.state.level) 
        this.props.getParticles({
          level: this.state.level
          });
      })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const answer = this.props.particle.randomParticle.particles
        const guess = this.state.guess
        console.log(answer)
        console.log(guess)
        if(this.arraysMatch(guess, answer))
        {
            this.props.randomParticle()
            this.tlCorrect.seek(0)
            this.tlCorrect.play()
        }else{
            this.tlWrong.seek(0)
            this.tlWrong.play()
        }
    }

    arraysMatch = (arr1, arr2) => {

      if (arr1.length !== arr2.length) return false;
    
      for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
      }
    
      return true;
    
    };
  
    render() {
        
        console.log(this.props)
        const particle  = this.props.particle.randomParticle
       
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
              { particle !== undefined && particle !== null ?
              <Form onSubmit={this.onSubmit}>
              <Card key={particle._id}>
                    <CardTitle style={{margin:'auto', textAlign:'center', fontSize:'1.2em', fontStyle:'bold'}}>What are the particles for [#]? </CardTitle>
                    <CardTitle style={{margin:'auto', textAlign:'center', fontSize:'1em'}}>{particle.jpSentence}</CardTitle>
                   
                    <CardBody>
                      {particle.particles.map((field, i)  => (
                        <CardSubtitle key={i}><span>[{i+1}]</span><Input 
                        type="text"
                        name="name"
                        className="col-3"
                        placeholder="?"
                        data-id={i}
                        onChange={this.onChange}
                        style={{margin:'auto', textAlign:'center', display:'inline-block', marginLeft:'1em', marginBottom:'1em'} }
                        autoFocus 
                        /></CardSubtitle>
                      ))}
                        <Button>Submit</Button>
                    </CardBody>
                </Card></Form>
                
                 : <Card>Empty</Card>}
            </Container>
          </div>
        )
    }
  }

  const mapStateToProps = (state) => ({
    particle: state.particle
})

export default connect(mapStateToProps, { getParticles, randomParticle })(Particle);