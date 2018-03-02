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

import DEFAULT_EDITOR_OPTIONS from '../../constants/editor-defaults';

class Editor extends Component {

  $editorWrapper: ?HTMLDivElement;

  constructor(props: Props) {
    super(props);

    this.onChange = props.onChange || (() => {});
    this.onCursorActivity = props.onCursorActivity || (() => {});
    this.onSelection = props.onSelection || (() => {});
    this.onScroll = props.onScroll || (() => {});
    this.editor = null;

    this.refreshed = false;

  }

  // called before we receive new props, e.g. a new value
  componentWillReceiveProps(nextProps) {

    //console.log("ComponentWillreceiveProps: ", nextProps);
    // Reset any changed options
    Object.keys(nextProps.options || {}).forEach(key => this.editor.setOption(key, nextProps.options[key]));

    // If new value set it first
    if(nextProps.value && nextProps.value !== this.props.value ){
      this.editor.setValue(nextProps.value || '');
    }

    // If we are active then refresh the editor
    if(nextProps.active && !this.refreshed){
      //console.log("Editor became active, refreshing")
      window.setTimeout(()=>{this.editor.refresh()},0);
      this.refreshed = true;
    }

    // If saved scroll position then scroll to it
    if(nextProps.scrollTo ){
      //console.log("Scrolling to :", nextProps.scrollTo);
      window.setTimeout(()=>{
      this.editor.scrollTo(nextProps.scrollTo.left, nextProps.scrollTo.top);
      },0);
    }

  }

  // Actually configure Codemirror and store it in local state
  setupEditor() {

    //console.log("init props: ", this.props);
    const editor = CodeMirror(
      this.$editorWrapper.querySelector(".editor-mount")
    );

    // Configure options
    var options = Object.assign({},this.props.options,DEFAULT_EDITOR_OPTIONS);
    Object.keys(options).forEach(key => editor.setOption(key, options[key]));

    // Set initial value
    editor.setValue(this.props.value || '');
    //console.log("setupEditor: value set to ", this.props.value);

    // Set the cursor
    if(this.props.cursor && this.props.cursor.line && this.props.cursor.ch){
      editor.setCursor(this.props.cursor);
    }
    //console.log("setupEditor: cursor set to ", this.props.cursor);

    // Add specified selections
    if(this.props.selection){
      //console.log("[Editor setup] editor.getSelections() before: ", editor.getSelections());
      //console.log("[Editor setup] setting initial selection to this.props.selection.ranges: ", this.props.selection);
      editor.setSelections(this.props.selection);
      ///console.log("[Editor setup] editor.getSelections() after: ", editor.getSelections());
    }

    if(this.props.scrollTo){
      //console.log("Initial scrolling to :", this.props.scrollTo);
      editor.scrollTo(this.props.scrollTo.left, this.props.scrollTo.top);
    }
    //console.log("setupEditor: selection set to ", this.props.selection);

    // Configure editor event hooks
    editor.on("beforechange", (editor) => {
      //console.log(this.props.id, " [event] beforeChange");
      this.onBeforeChange(editor);
      //changes.cancel();
    });

    editor.on("change", (editor, changes) => {
      //console.log(this.props.id, " [event] change");
      this.onChange(editor, editor.getValue());
    });

    editor.on("cursorActivity", (editor) => {
      //console.log(this.props.id, " [event] cursorActivity");
      this.onCursorActivity(editor);
    });

    editor.on('beforeSelectionChange', (editor, data) => {
      this.onSelection(editor.listSelections());
    });

    editor.on('scroll', (editor) => {
      var left = editor.getScrollInfo().left;
      var top = editor.getScrollInfo().top;//editor.charCoords({line: editor.getCursor().line, ch: 0}, "local").top;
      this.onScroll({left, top});
    });
    //console.log("setupEditor: events configured");

    if( this.props.onReady && typeof this.props.onReady === "function" ){
      //console.log(this.props.id, " [event] onReady");
      this.props.onReady(editor);
    }

    // Add to global
    window.editor = editor;

    this.editor = editor;

    return editor;
  }

  // Once we have been added to DOM
  componentDidMount() {
    this.setupEditor();
    //console.log(this.props.id, " added to DOM");
  }

  // Once we are about to be removed from DOM
  componentWillUnmount() {
    if (this.editor) {
      //this.editor.destroy();
    }
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
