import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavItem } from 'reactstrap'
import { PropTypes } from 'prop-types';
import { logout } from '../actions/authActions';
import { NavLink } from 'react-router-dom'

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

  render() {
    return (
      <NavItem>    
          <NavLink onClick={this.props.logout} to="#">
            Logout
          </NavLink>

      </NavItem>
    )
  }
}

export default connect(null, { logout })(Logout)
