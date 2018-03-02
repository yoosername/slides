import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import './Tabbable.css';
import classnames from 'classnames';

export default class Tabbable extends Component {

  constructor(props){
    super(props);

    this.state = {
      lastUpdatedTimestamp : ""
    }
  }

  componentDidMount(){
    this.check = window.setInterval(()=>{
      try{
        var t = new Date(parseInt(localStorage.getItem("lastUpdatedTimestamp"), 10));
        var lastUpdatedTimestamp = t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
        lastUpdatedTimestamp && this.setState({lastUpdatedTimestamp})
      }catch(e){}
    },1000);
  }

  componentWillUnmount(){
    window.clearInterval(this.check);
  }

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

    const autosaved = (this.state.lastUpdatedTimestamp) ? `Autosaved ${this.state.lastUpdatedTimestamp}` : "";

    return (
      <div>
        <Nav tabs>
          {childrenNavLinks}
          <div className="autosaveText">{autosaved}</div>
        </Nav>
        <TabContent activeTab={this.props.activeTab}>
          {childrenNavContent}
        </TabContent>
      </div>
    );
  }
}
