import React, { Component } from 'react'
import { Container, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Form, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { getShigotos, randomShigoto } from '../actions/shigotoActions';
import PropTypes from 'prop-types';
import HintModal from './HintModal'

export class ShigotoCard extends Component {

    state = {
        guess: '',
        validateText: ''
    }

    static propTypes = {
        getShigotos: PropTypes.func.isRequired,
        shigoto: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount(){
        this.props.getShigotos();
        this.props.randomShigoto();
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

        const answer = this.props.shigoto.randomShigoto.jpName
        const jpAnswer = this.props.shigoto.randomShigoto.hiragana
        console.log(this.state)
        console.log(answer)
        if(answer.toLowerCase() === this.state.guess.toLowerCase() ||
          jpAnswer === this.state.guess)
        {
          this.updateValidateText('Correct')
          setTimeout(function() { //Start the timer
            this.props.randomShigoto()
            this.updateValidateText('')
            document.getElementById('item').value = ''
        }.bind(this), 1000)
        }else{
          this.updateValidateText('Wrong')
        }

        //this.props.randomShigoto()
    } 
  
    render() {
        
        const { shigotos } = this.props.shigoto
        const shigoto  = this.props.shigoto.randomShigoto
       
        return (
          <div>
            <Container>
              <HintModal />
              { shigoto !== undefined && shigoto !== null ?
              <Form onSubmit={this.onSubmit}>
              <Card>
                    <CardImg top style={{width: '375px', height: '335px', margin:'auto'}} src={require(`../img/${shigoto.img}`)} alt="Card Image" />
                    <CardBody>
                        <CardTitle>{shigoto.engName}</CardTitle>
                        <CardSubtitle><Input 
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Romaji Guess here"
                                onChange={this.onChange}
                                style={{width: '375px', margin:'auto', textAlign:'center'}} 
                                /></CardSubtitle>
                        <CardText id='validateText'>{this.state.validateText}</CardText>
                        <Button
                          style={{marginTop: '1rem'}}>Button</Button>
                    </CardBody>
                </Card></Form>
                
                 : <Card>Empty</Card>}
            </Container>
          </div>
        )
    }
  }

//   const mapStateToProps = (state) => ({
//     shigoto: state.shigoto,
//     singleShigoto: state.shigoto.shigotos.randomElement()
//     // isAuthenticated: state.auth.isAuthenticated
// })


function mapStateToProps(state){
  console.log(state)
  // const rng = null
  // if(state.shigoto.length > 0){
  //   rng = state.shigoto.shigotos.randomElement()
  //   console.log(rng)
  //   ShigotoCard.setState({ 
  //     engName : rng.engName,
  //     jpName : rng.jpName,
  //     img: rng.img
  //   });

  // }
  return {
  shigoto: state.shigoto,
  // isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps, { getShigotos, randomShigoto })(ShigotoCard);