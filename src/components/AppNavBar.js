import React, { Component, Fragment } from 'react'
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand,
    NavItem,  Container
} from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom'
import Logout  from './Logout';
import LoginModal from './LoginModal';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import '../App.css'

class AppNavbar extends Component {

    state = {
        isOpen: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){  
        console.log(this.props)
        const { isAuthenticated } = this.props.auth

        const authLinks = (
            <Fragment>
                <NavItem>      
                    <NavLink to="/shigoto">
                        Shigoto
                    </NavLink>
                </NavItem>
                <NavItem>      
                    <NavLink to="/vocabulary">
                        Vocabulary
                    </NavLink>
                </NavItem>
                <NavItem>    
                    <NavLink to="/shigotoAdmin">
                        Shigoto (Admin)
                    </NavLink>
                </NavItem>
                <NavItem>     
                    <NavLink to="/vocabularyAdmin">
                        Vocabulary (Admin)
                    </NavLink>
                </NavItem>
                <Logout />
            </Fragment>
        );

        const guestLinks = (
                
            <Fragment>
            <NavItem>     
                <NavLink to="/shigoto">
                    Shigoto
                </NavLink>
            </NavItem>
            <NavItem>   
                    <NavLink to="/vocabulary">
                        Vocabulary
                    </NavLink>
            </NavItem>
            <LoginModal />
        </Fragment>
        );

        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Learn Nihongo</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            { isAuthenticated ? authLinks : guestLinks } 
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
            );
        }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default compose(
    withRouter,
    connect(mapStateToProps)
  )(AppNavbar);