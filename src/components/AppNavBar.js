import React, { Component, Fragment } from 'react'
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand,
    NavItem,  Container
} from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom'
class AppNavbar extends Component {

    state = {
        isOpen: false
    };

    // static propTypes = {
    //     auth: PropTypes.object.isRequired
    // }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){  
        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Learn Nihongo</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Fragment>
                                <NavItem>
                                    <NavLink to="/shigoto">
                                        Shigoto
                                    </NavLink>
                                </NavItem>
                                
                                {/* { isAuthenticated ? authLinks : guestLinks } */}
                            </Fragment>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
            );
        }
}

export default withRouter(AppNavbar)