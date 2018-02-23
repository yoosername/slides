import React, { Component } from "react";
import classnames from "classnames";
import CodeMirror  from "codemirror";

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

import './Editor.css';

class Editor extends Component {

  $editorWrapper: ?HTMLDivElement;

  constructor(props: Props) {
    super(props);

    this.onChange = props.onChange || (() => {});
    this.onCursorActivity = props.onCursorActivity || (() => {});
    this.cursor = null;
    this.options = Object.assign({},props.options,{
      enableCodeFolding: true,
      extraKeys: {},
      foldGutter: false,
      lineNumbers: true,
      lineWrapping: true,
      matchBrackets: true,
      mode: "javascript",
      readOnly: false,
      showAnnotationRuler: true,
      theme: "material",
      value: props.value || ""
    });
    this.state = {
      editor: null
    };
  }

  // called before we receive new props, e.g. a new value
  componentWillReceiveProps(nextProps) {
    if (!this.state.editor) {
      return;
    }
    if(nextProps.value !== this.state.editor.getValue()){
      this.setValue(nextProps);
      this.setCursor(nextProps);
      //this.scrollToLocation(nextProps);
    }
  }

  // use this to prepare any UI specific tweaks before rendering
  componentWillUpdate(nextProps) {

    if (!this.state.editor) {
      return false;
    }

  }

  // Set the value of the editor
  setValue(props){
    //console.log("editor should be: ", this.state.editor.getValue());
    this.state.editor.setValue(props.value);
    //console.log("editor should show: ", props.value);
  }

  // Position the cursor in the editor
  setCursor(props){
    this.state.editor.setCursor(props.cursor);
    this.cursor = this.state.editor.getCursor();
  }

  // Scroll to position
  scrollToLocation(props){

  }

  // Actually configure Codemirror and store it in local state
  setupEditor() {

    const editor = CodeMirror(
      this.$editorWrapper.querySelector(".editor-mount"),
      this.options
    );

    window.editor = editor; //TODO remove after manual testing

    editor.on("beforeChange", (editor, changes) => {
      if(changes.origin === "setValue"){
        return changes.cancel();
      }
      this.onChange(editor, editor.getValue())
      //changes.cancel();
    });

    editor.on("cursorActivity", (editor) => {
      if(this.cursor !== editor.getCursor()){
        //console.log(editor.getCursor())
        this.onCursorActivity(editor);
      }
    });

    this.setState({ editor });

    return editor;
  }

  // Once we have been added to DOM
  componentDidMount() {
    this.setupEditor();
  }

  // Once we are about to be removed from DOM
  componentWillUnmount() {
    if (this.state.editor) {
      this.state.editor.destroy();
      this.setState({ editor: null });
    }
  }

  // Should we update ??
  shouldComponentUpdate(nextProps, nextState){
    if (!this.state.editor) {
      return false;
    }
    if(nextProps.value !== this.state.editor.getValue()){
      return true;
    }
    return false;
  }

  // If we did update and have new props / state
  componentDidUpdate(prevProps, prevState) {
    //console.log("we updated: ",this.props)
  }

  render() {

    return (
      <div
        className={classnames("editor-wrapper")}
        ref={c => (this.$editorWrapper = c)}
      >
        <div
          className="editor-mount"
        />
      </div>
    );
  }
}

export default Editor;
