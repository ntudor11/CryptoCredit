import React, {Component} from 'react'
import {withRouter} from 'react-router'
import logo from '../logo-cc.svg'
import User from '../user2.svg'
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/login" activeClassName="active"
               className="nav-link underline-from-center">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/register" activeClassName="active"
              className="nav-link underline-from-center">
            Register
          </NavLink>
        </li>
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink exact activeClassName="active" to="/profile" className="nav-link underline-from-center">
            User
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink exact activeClassName="active" to="/dashboard" className="nav-link underline-from-center">
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink exact activeClassName="active" to="/wallet" className="nav-link underline-from-center">
            Wallet
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink exact activeClassName="active" to="/transactions" className="nav-link underline-from-center">
            Transactions
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink exact activeClassName="active" to="/marketplace" className="nav-link underline-from-center">
            Marketplace
          </NavLink>
        </li>

        <li className="nav-item">
          {/* eslint-disable-next-line*/ }
          <a href="" onClick={this.logOut.bind(this)} to="/register" className="nav-link underline-from-center">
            Log Out
          </a>
        </li>
        <li className="nav-item">
            <img src={User} height="40px" alt="logged-user" style={{float:"right"}}/>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-light">

        <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>

        <button className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar1"
          aria-controls="navbar1"
          aria-expanded="false"
          aria-label="Toggle Navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-md-end" id="navbar1">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact activeClassName="active" to="/" className="nav-link underline-from-center">
                Home
              </NavLink>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
