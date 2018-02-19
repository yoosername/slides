import React, { Component } from 'react';
import './Preview.css';

export default class Preview extends Component {

  // Dont rerender iframe with React because it will cause a reload
  shouldComponentUpdate() {
    return false;
  }

  // Use props to determine the Reveal.js config and send props as messages
  componentWillReceiveProps(nextProps) {
    // if (this.props(MSG_PROP) !== nextProps(MSG_PROP) ) {
    //   console.log("send message here");
    // }
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
