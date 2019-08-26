// import React, { Component } from 'react'
// import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { connect } from 'react-redux';
// import { getShigotos } from '../../actions/shigotoActions';
// import PropTypes from 'prop-types';

// export class ShigotoList extends Component {

//     static propTypes = {
//         getShigotos: PropTypes.func.isRequired,
//         shigoto: PropTypes.object.isRequired,
//         isAuthenticated: PropTypes.bool
//   }

//   componentDidMount(){
//       this.props.getShigotos();
//   }
  
//     render() {
//       console.log(this.props)
//       console.log(this.state)
//       const { shigotos } = this.props.shigoto;
//       return (
//         <div>
//           <Container>
//               <ListGroup>
//                   <TransitionGroup className="shigoto-list">
//                       {shigotos.map(({ _id, jpName }) => (
//                           <CSSTransition key={_id} timeout={500} classNames="fade">
//                               <ListGroupItem>
//                                   {jpName}
//                               </ListGroupItem>
//                           </CSSTransition>
//                       ))}
//                   </TransitionGroup>
//               </ListGroup>
//           </Container>
//         </div>
//       )
//     }
//   }

//   const mapStateToProps = (state) => ({
//     shigoto: state.shigoto,
//     // isAuthenticated: state.auth.isAuthenticated
// })

// export default connect(mapStateToProps, { getShigotos })(ShigotoList);
