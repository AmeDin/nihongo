import React, { Component } from 'react'
import { Container, Card, CardTitle, CardText, CardBody,
     CardSubtitle, Button, Form, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getAlphabets, randomAlphabet } from '../../actions/alphabetActions';
import PropTypes from 'prop-types';
import MultiToggle from 'react-multi-toggle-extra';
import successAnswer from '../../img/gif/success.gif'
import fail from '../../img/gif/fail.gif'

export class Katakana extends Component {

    state = {
        guess: '',
        level: 1,
        isHiragana: false,
        groupSize: 3
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
        getAlphabets: PropTypes.func.isRequired,
        alphabet: PropTypes.object.isRequired
    }

    componentDidMount(){
        const defaultSetting = {
            isHiragana: this.state.isHiragana,
            level: this.state.level
        }
        this.props.getAlphabets(defaultSetting);
        this.props.randomAlphabet();
    }

    onChange = (e) => {
        this.setState({ 
            guess : e.target.value
        });
    }

    onGroupSizeSelect  = value => {
      this.setState({ level: value } , () => { 
        console.log(this.state.level) 
        this.props.getAlphabets({
          isHiragana: this.state.isHiragana,
          level: this.state.level
          });
      })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const answer = this.props.alphabet.randomAlphabet.jpName
        if(answer.toLowerCase() === this.state.guess.toLowerCase())
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
              this.props.randomAlphabet()
              document.querySelector('#item').value = ''
          }
      }.bind(this), duration)
    };
  
    render() {
        
        console.log(this.props)
        const alphabet  = this.props.alphabet.randomAlphabet
       
        return (
          <div>
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
    alphabet: state.alphabet
})

export default connect(mapStateToProps, { getAlphabets, randomAlphabet })(Katakana);