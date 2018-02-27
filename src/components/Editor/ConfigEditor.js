import React from "react";
import { connect } from "react-redux";
import {
  updateConfigValue,
  updateConfigCursor,
  updateConfigSelection
} from "../../state/actions/index";

import Editor from './Editor';

const mapStateToProps = state => {
  return {
    value: state.config.value,
    cursor: state.config.cursorPos,
    selection: state.config.selection
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBeforeChange: editor => dispatch(updateConfigValue(editor.getValue())),
    onCursorActivity: editor => dispatch(updateConfigCursor(editor.getCursor())),
    onSelection: (selections) => dispatch(updateConfigSelection(selections))
  };
};

const ConnectedConfigEditor = (props) => (
  <Editor
    options={{
      mode: "javascript",
      theme: "material"
    }}
    {...props}
  />
);
const ConfigEditor = connect(mapStateToProps,mapDispatchToProps)(ConnectedConfigEditor);

export default ConfigEditor;
