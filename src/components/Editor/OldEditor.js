import React, { Component } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import {default as RawEditor} from "./RawEditor";
//import CodeMirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

import './Editor.css';

var wto = null;

export default class Editor extends Component {

  constructor(props){
    super();
    this.instance = null;
    this.id = props.id;
    this.initialized = false;
  }

  static defaultProps = {
    mode: "javascript",
    theme: "darkrain",
    lineNumbers: true
  }

  // This is fired when we receive props, so can detect if being made active or not
  componentWillReceiveProps(nextProps) {
    //
  }

  render() {

    return (
      // <CodeMirror
      //   value={this.props.value}
      //   options={this.props}
      //   name={this.props.id}
      //   onChange={this.props.onChange}
      //   onCursorActivity={this.props.onCursorActivity}
      //   preserveScrollPosition={true}
      // />
      // <CodeMirror className="Editor"
      //   value={this.props.value}
      //   options={this.props.options}
      //   onBeforeChange={(editor, data, value) => {
      //     clearTimeout(wto);
      //     wto = setTimeout(function() {
      //       this.props.onBeforeChange(editor, data, value);
      //     }.bind(this), 1000);
      //   }}
      //   onChange={this.props.onChange}
      //   scrollPos={this.props.scrollPos}
      //   cursorPos={this.props.cursorPos}
      //   textSelection={this.props.textSelection}
      //   onScroll={this.props.onScrollPosChange}
      //   onCursor={this.props.onCursorPosChange}
      // />
      <RawEditor />
    );
  }
}
