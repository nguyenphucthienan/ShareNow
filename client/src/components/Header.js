import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderHeader() {
    return [
      <li key="1"><Link to="/about">About</Link></li>,
      <li key="2"><a href="/api/login/google">Login</a></li>
    ];
  }

  render() {
    return (
      <header>
        <div className="navbar-fixed">
          <nav className="transparent-fixed">
            <div className="nav-wrapper blue darken-2">
              <Link to="/" className="brand-logo">
                <i className="material-icons">face</i>ShareNow
              </Link>

              <a data-activates="nav-mobile" className="button-collapse pointer-cursor">
                <i className="material-icons">menu</i>
              </a>

              <ul className="right hide-on-med-and-down">
                {this.renderHeader()}
              </ul>

              <ul className="side-nav" id="nav-mobile">
                {this.renderHeader()}
              </ul>
            </div>
          </nav >
        </div>
      </header>
    );
  }
}

export default Header;