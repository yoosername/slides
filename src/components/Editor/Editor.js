import React, { Component } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

import './Editor.css';

var wto;

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
    this.props.onReady( this.id, this.instance, nextProps.active );
  }

  render() {

    return (
      <CodeMirror className="Editor"
        editorDidMount={editor => { this.instance = editor; }}
        value={this.props.value}
        options={this.props}
        onBeforeChange={(editor, data, value) => {
          this.props.setValue(this.id, value);
        }}
        onChange={(editor, data, value) => {
          clearTimeout(wto);
          wto = setTimeout(function() {
            this.props.onChange(this.id, editor, value);
          }.bind(this), 1000);
        }}
        onCursor={(editor, data) => {
          this.props.onCursor(this.id, editor, data);
        }}
      />
    );
  }
}
