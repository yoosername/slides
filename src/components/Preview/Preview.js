import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  slide
} from "../../state/actions/index";

import './Preview.css';

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSlide: val => dispatch(slide(val)),
  };
};

class ConnectedPreview extends Component {

  // Dont rerender iframe with React because it will cause a reload
  shouldComponentUpdate() {
    return false;
  }

  // Use props to determine the Reveal.js config and send props as messages
  componentWillReceiveProps(nextProps) {
    console.log("[IFRAME] : store has changed so we could send it via message here");
  }

  // When this component is loaded successully start listening for messages from iframe
  componentDidMount() {
    this.ifr.onload = () => {
      this.ifr.contentWindow.postMessage('preview-started', '*');
    };
    window.addEventListener("message", this.handleFrameTasks);
  }

  // Unload the event listener when component is unloaded.
  componentWillUnmount() {
    window.removeEventListener("message", this.handleFrameTasks);
  }

  // Do something with the messages we receive
  handleFrameTasks = (e) => {
    console.log("Received message from frame: ", e);
  }

  render() {
    return (
      <iframe
        sandbox="allow-scripts"
        ref={(f) => this.ifr = f }
        title="preview"
        src={this.props.src}
        className='Preview'
      />
    );
  }
}

const Preview = connect(mapStateToProps,mapDispatchToProps)(ConnectedPreview);

export default Preview;
