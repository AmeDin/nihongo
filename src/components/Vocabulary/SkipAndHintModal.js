import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody,
    ListGroup, ListGroupItem, Col, Row
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getVocabulary, randomVocabulary } from './../../actions/vocabularyActions';

export class SkipAndHintModal extends Component {
    state = {
        modal: false,
    }

    static propTypes = {
        getVocabulary: PropTypes.func.isRequired,
        vocabulary: PropTypes.object.isRequired,
    } 

    componentDidMount(){
        this.props.getVocabulary();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    skip = () => {
        this.props.randomVocabulary()
    } 
  
    render() {
        const vocabularies  = this.props.vocabulary.vocabularys;
        console.log(vocabularies)
        console.log(this.props)
        console.log(this.state)
        return (
            <div>
                {<Row>
                    <Col xs="6">
                        <Button 
                            color="dark"
                            style={{marginBottom: '2rem', minWidth: '110px'}}
                            onClick={this.toggle}>
                            Show Hints
                        </Button> 
                    </Col>
                    <Col xs="6">
                        <Button 
                            color="dark"
                            style={{marginBottom: '2rem', minWidth: '110px'}}
                            onClick={this.skip}>
                            Skip
                        </Button> 
                    </Col>
                </Row>
                }
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>List of Vocabulary</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        <TransitionGroup className="vocabulary-list">
                            {vocabularies.map(({ _id, jpName }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        {jpName}
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup>
                </ModalBody>
                </Modal>
            </div>
        )

  }
}

const mapStateToProps = (state) => ({
    vocabulary: state.vocabulary
})


export default connect(mapStateToProps, { getVocabulary, randomVocabulary })(SkipAndHintModal);
