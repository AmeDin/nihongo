import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody,
    ListGroup, ListGroupItem, Col, Row
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getShigotos, randomShigoto } from '../../actions/shigotoActions';

export class SkipAndHintModal extends Component {
    state = {
        modal: false,
    }

    static propTypes = {
        getShigotos: PropTypes.func.isRequired,
        shigoto: PropTypes.object.isRequired,
    } 

    componentDidMount(){
        this.props.getShigotos();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    skip = () => {
        this.props.randomShigoto()
    } 
  
    render() {
        const { shigotos } = this.props.shigoto;
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
                <ModalHeader toggle={this.toggle}>List of Shigoto</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        <TransitionGroup className="shigoto-list">
                            {shigotos.map(({ _id, jpName }) => (
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
    shigoto: state.shigoto,
})


export default connect(mapStateToProps, { getShigotos, randomShigoto })(SkipAndHintModal);
