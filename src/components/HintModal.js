import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody,
    ListGroup, ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getShigotos } from '../actions/shigotoActions';

export class HintModal extends Component {
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
  
    render() {
        const { shigotos } = this.props.shigoto;
        console.log(this.props)
        console.log(this.state)
        return (
            <div>
                { <Button 
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}>
                    Show Hints
                </Button> 
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


export default connect(mapStateToProps, { getShigotos })(HintModal);
