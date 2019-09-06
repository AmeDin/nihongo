import React, { Component } from 'react'
import { Container, Card, CardTitle, CardText, CardBody,
     CardSubtitle, Button, Form, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getAlphabets, randomAlphabet } from '../../actions/alphabetActions';
import PropTypes from 'prop-types';
import MultiToggle from 'react-multi-toggle-extra';

export class Hiragana extends Component {

    state = {
        guess: '',
        validateText: '',
        level: 1,
        isHiragana: true,
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

    updateValidateText = (value) => {
        this.setState({ 
          validateText : value
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
          this.updateValidateText('Correct')
          document.getElementById('validateText').style.display = 'block'
          setTimeout(function() { //Start the timer
            this.props.randomAlphabet()
            this.updateValidateText('')
            document.getElementById('item').value = ''
            document.getElementById('validateText').style.display = 'none'
        }.bind(this), 500)
        }else{
          this.updateValidateText('Wrong')
        }
    } 
  
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
    alphabet: state.alphabet
})

export default connect(mapStateToProps, { getAlphabets, randomAlphabet })(Hiragana);