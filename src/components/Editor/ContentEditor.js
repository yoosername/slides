import React from "react";
import { connect } from "react-redux";
import {EDITOR_DEFAULTS_CONTENT_URL} from "../../constants/editor-defaults";
import {
  updateContentValue,
  updateContentCursor,
  updateContentSelection,
  updateContentScroll,
  fetchDefaultContentValue
} from "../../state/actions/index";

import Editor from './Editor';

const mapStateToProps = state => {
  return {
    active: state => (state.activeTab === 1),
    value: state.content.value,
    cursor: state.content.cursorPos,
    selection: state.content.selection,
    scrollTo: state.content.scrollTo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBeforeChange: editor => dispatch(updateContentValue(editor.getValue())),
    onCursorActivity: editor => dispatch(updateContentCursor(editor.getCursor())),
    onSelection: (selections) => dispatch(updateContentSelection(selections)),
    onScroll: (pos) => dispatch(updateContentScroll(pos)),
    onReady: (editor) => dispatch(fetchDefaultContentValue(EDITOR_DEFAULTS_CONTENT_URL,(editor.getValue()==="")))
  };
};

const ConnectedContentEditor = (props) => (
  <Editor
    options={{
      mode: "htmlmixed",
      theme: "material"
    }}
    {...props}
  />
);
const ContentEditor = connect(mapStateToProps,mapDispatchToProps)(ConnectedContentEditor);

export default ContentEditor;
