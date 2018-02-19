import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem } from 'reactstrap';

import 'open-iconic/font/css/open-iconic-bootstrap.css';
import './Header.css';

export default class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  preview(){
    console.log("Preview button was clicked");
    window.location.href = "/preview.html";
  }

  render() {
    return (
      <div>
        <Navbar className="Header" expand="md">
          <NavbarBrand className="Brand" href="/">
            <span className="oi oi-browser"></span>&nbsp;
            Slider
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <span className="oi oi-fullscreen-enter" title="fullscreen"  onClick={this.preview} aria-hidden="true"></span>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
