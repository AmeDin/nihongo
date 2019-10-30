import React, { Component, Fragment } from 'react'
import {
    Collapse, Navbar, NavbarToggler, 
    NavItem,  Container, Dropdown, DropdownToggle,
    DropdownItem, DropdownMenu
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
        isOpen: false,
        dropdownAOpen: false,
        dropdownBOpen: false,
        dropdownCOpen: false,
        dropdownDOpen: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDropdownA = () => {
        this.setState({
            dropdownAOpen: !this.state.dropdownAOpen
        });
    }

    toggleDropdownB = () => {
        this.setState({
            dropdownBOpen: !this.state.dropdownBOpen
        });
    }

    toggleDropdownC = () => {
        this.setState({
            dropdownCOpen: !this.state.dropdownCOpen
        });
    }

    toggleDropdownD = () => {
        this.setState({
            dropdownDOpen: !this.state.dropdownDOpen
        });
    }

    closeNavBartoggle = () => {
        if(this.state.isOpen){
            this.toggle()
        }
    }

    render(){  
        console.log(this.props)
        const { isAuthenticated } = this.props.auth

        const authLinks = (
            <Fragment>
                <Dropdown isOpen={this.state.dropdownAOpen} toggle={this.toggleDropdownA} className="m-2">
                    <DropdownToggle caret>
                        Character    
                    </DropdownToggle>
                    <DropdownMenu className="bg-dark">
                        <DropdownItem>
                            <NavItem className="noBullet">
                                <NavLink to="/hiragana" onClick={this.closeNavBartoggle}>
                                    Hiragana
                                </NavLink>
                            </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                            <NavItem className="noBullet">
                                <NavLink to="/katakana" onClick={this.closeNavBartoggle}>
                                    Katakana
                                </NavLink>
                            </NavItem>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown isOpen={this.state.dropdownBOpen} toggle={this.toggleDropdownB} className="m-2">
                    <DropdownToggle caret>
                        Shigoto  
                    </DropdownToggle>
                    <DropdownMenu className="bg-dark">
                        <DropdownItem>
                            <NavItem className="noBullet">
                                <NavLink to="/shigoto" onClick={this.closeNavBartoggle}>
                                    Practice
                                </NavLink>
                            </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                            <NavItem className="noBullet">
                                <NavLink to="/shigotoAdmin" onClick={this.closeNavBartoggle}>
                                    Admin
                                </NavLink>
                            </NavItem>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown isOpen={this.state.dropdownCOpen} toggle={this.toggleDropdownC} className="m-2">
                    <DropdownToggle caret>
                        Vocabulary  
                    </DropdownToggle>
                    <DropdownMenu className="bg-dark">
                        <DropdownItem>
                            <NavItem className="noBullet">
                                <NavLink to="/vocabulary" onClick={this.closeNavBartoggle}>
                                    Practice
                                </NavLink>
                            </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                            <NavItem className="noBullet">
                                <NavLink to="/vocabularyAdmin" onClick={this.closeNavBartoggle}>
                                    Admin
                                </NavLink>
                            </NavItem>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown isOpen={this.state.dropdownDOpen} toggle={this.toggleDropdownD} className="m-2">
                    <DropdownToggle caret>
                        Sentence  
                    </DropdownToggle>
                    <DropdownMenu className="bg-dark">
                        <DropdownItem>
                            <NavItem className="noBullet" onClick={this.closeNavBartoggle}>
                                <NavLink to="/sentence">
                                    Practice
                                </NavLink>
                            </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                            <NavItem className="noBullet">
                                <NavLink to="/sentenceAdmin" onClick={this.closeNavBartoggle}>
                                    Admin
                                </NavLink>
                            </NavItem>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavItem className="noBullet"> 
                    <NavLink to="/clock" onClick={this.closeNavBartoggle}>
                        Clock
                    </NavLink>
                </NavItem>
                <Logout />
            </Fragment>
        );

        const guestLinks = (
                
            <Fragment>
                <NavItem className="noBullet">   
                    <NavLink to="/hiragana" onClick={this.closeNavBartoggle}>
                        Hiragana
                    </NavLink>
                </NavItem>
                <NavItem className="noBullet">
                    <NavLink to="/katakana" onClick={this.closeNavBartoggle}>
                        Katakana
                    </NavLink>
                </NavItem>
                <NavItem className="noBullet">    
                    <NavLink to="/shigoto" onClick={this.closeNavBartoggle}>
                        Shigoto
                    </NavLink>
                </NavItem>
                <NavItem className="noBullet">  
                    <NavLink to="/vocabulary" onClick={this.closeNavBartoggle}>
                        Vocabulary
                    </NavLink>
                </NavItem>
                <NavItem className="noBullet">  
                    <NavLink to="/sentence" onClick={this.closeNavBartoggle}>
                        Sentence
                    </NavLink>
                </NavItem>
                <NavItem className="noBullet">   
                    <NavLink to="/clock" onClick={this.closeNavBartoggle}>
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
                      <NavLink to="/" exact className="navbar-brand">Learn Nihongo</NavLink>
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