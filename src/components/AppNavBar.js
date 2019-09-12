import React, { Component, Fragment } from 'react'
import {
    Collapse, Navbar, NavbarToggler, 
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
                <NavItem className="noBullet">
                    <NavLink to="/hiragana" onClick={this.toggle}>
                        Hiragana
                    </NavLink>
                </NavItem>
                <NavItem className="noBullet">
                    <NavLink to="/shigoto" onClick={this.toggle}>
                        Shigoto
                    </NavLink>
                </NavItem>
                <NavItem className="noBullet">  
                    <NavLink to="/vocabulary" onClick={this.toggle}>
                        Vocabulary
                    </NavLink>
                </NavItem>
                <NavItem className="noBullet"> 
                        <NavLink to="/clock" onClick={this.toggle}>
                            Clock
                        </NavLink>
                </NavItem>
                <NavItem className="noBullet">  
                    <NavLink to="/shigotoAdmin" onClick={this.toggle}>
                        Shigoto (Admin)
                    </NavLink>
                </NavItem>
                <NavItem className="noBullet">  
                    <NavLink to="/vocabularyAdmin" onClick={this.toggle}>
                        Vocabulary (Admin)
                    </NavLink>
                </NavItem>
                <Logout />
            </Fragment>
        );

        const guestLinks = (
                
            <Fragment>
                <NavItem className="noBullet">   
                    <NavLink to="/hiragana" onClick={this.toggle}>
                        Hiragana
                    </NavLink>
                </NavItem>
                <NavItem className="noBullet">    
                    <NavLink to="/shigoto" onClick={this.toggle}>
                        Shigoto
                    </NavLink>
                </NavItem>
                <NavItem className="noBullet">  
                        <NavLink to="/vocabulary" onClick={this.toggle}>
                            Vocabulary
                        </NavLink>
                </NavItem>
                <NavItem className="noBullet">   
                        <NavLink to="/clock" onClick={this.toggle}>
                            Clock
                        </NavLink>
                </NavItem>
                <LoginModal />
        </Fragment>
        );

        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavLink to="/" className="navbar-brand">Learn Nihongo</NavLink>
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