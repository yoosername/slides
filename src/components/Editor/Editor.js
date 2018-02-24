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

const DEFAULT_OPTIONS = {
  enableCodeFolding: true,
  extraKeys: {},
  foldGutter: false,
  lineNumbers: true,
  lineWrapping: true,
  matchBrackets: true,
  mode: "javascript",
  readOnly: false,
  showAnnotationRuler: true,
  theme: "material"
};

var Helper = (function () {
    function Helper() {
    }
    Helper.equals = function (x, y) {
        var _this = this;
        var ok = Object.keys, tx = typeof x, ty = typeof y;
        return x && y && tx === 'object' && tx === ty ? (ok(x).length === ok(y).length &&
            ok(x).every(function (key) { return _this.equals(x[key], y[key]); })) : (x === y);
    };
    return Helper;
}());

class Editor extends Component {

  $editorWrapper: ?HTMLDivElement;

  constructor(props: Props) {
    super(props);

    this.onChange = props.onChange || (() => {});
    this.onCursorActivity = props.onCursorActivity || (() => {});
    this.cursor = null;
    this.editor = null;
  }

  // called before we receive new props, e.g. a new value
  componentWillReceiveProps(nextProps) {
    // Reset any changed options
    Object.keys(nextProps.options || {}).forEach(key => this.editor.setOption(key, nextProps.options[key]));

    // If new value set it first
    if(nextProps.value && nextProps.value !== this.props.value ){
      this.editor.setValue(nextProps.value || '');
    }

    // If new cursor and different to preserved, then put cursor back
    if (nextProps.cursor) {
        if (!Helper.equals(this.props.cursor, nextProps.cursor)) {
          this.editor.setCursor(nextProps.cursor);
        }
    }

  }

  // Actually configure Codemirror and store it in local state
  setupEditor() {

    const editor = CodeMirror(
      this.$editorWrapper.querySelector(".editor-mount")
    );

    var options = Object.assign({},this.props.options,DEFAULT_OPTIONS);
    Object.keys(options).forEach(key => editor.setOption(key, options[key]));
    editor.setValue(this.props.value || '');
    editor.setCursor(this.props.cursor);

    editor.on("beforechange", (editor) => {
      this.onBeforeChange(editor);
      //changes.cancel();
    });

    editor.on("change", (editor, changes) => {
      this.onChange(editor, editor.getValue());
    });

    editor.on("cursorActivity", (editor) => {
      this.onCursorActivity(editor);
    });

    this.editor = editor;

    return editor;
  }

  // Once we have been added to DOM
  componentDidMount() {
    this.setupEditor();
  }

  // Once we are about to be removed from DOM
  componentWillUnmount() {
    if (this.editor) {
      this.editor.destroy();
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
