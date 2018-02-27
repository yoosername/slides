import React from "react";
import { connect } from "react-redux";
import {
  updateContentValue,
  updateContentCursor,
  updateContentSelection
} from "../../state/actions/index";

import Editor from './Editor';

const mapStateToProps = state => {
  return {
    value: state.content.value,
    cursor: state.content.cursorPos,
    selection: state.content.selection
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBeforeChange: editor => dispatch(updateContentValue(editor.getValue())),
    onCursorActivity: editor => dispatch(updateContentCursor(editor.getCursor())),
    onSelection: (selections) => dispatch(updateContentSelection(selections))
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
