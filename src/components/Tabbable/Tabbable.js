import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import './Tabbable.css';
import classnames from 'classnames';

export default class Tabbable extends Component {

  render() {

    const childrenNavLinks = React.Children.map(this.props.children, (child,idx) => {
      //console.log(idx);
      return (
        <NavItem>
          <NavLink
            className={classnames({ active: this.props.activeTab === idx })}
            onClick={() => { this.props.toggle(idx); }}
          >
            {child.props.id}
          </NavLink>
        </NavItem>
      )
    });

    const childrenNavContent = React.Children.map(this.props.children, (child,idx) => {
      //console.log(child);
      return (
        <TabPane tabId={idx}>
          {child}
        </TabPane>
      )
    });

    return (
      <div>
        <Nav tabs>
          {childrenNavLinks}
          <div className="autosaveText">Autosaved @ 12:43</div>
        </Nav>
        <TabContent activeTab={this.props.activeTab}>
          {childrenNavContent}
        </TabContent>
      </div>
    );
  }
}
