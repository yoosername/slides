import React from "react";
import { connect } from "react-redux";
import {EDITOR_DEFAULTS_CONFIG_URL} from "../../constants/editor-defaults";
import {
  updateConfigValue,
  updateConfigCursor,
  updateConfigSelection,
  fetchDefaultConfigValue
} from "../../state/actions/index";

import Editor from './Editor';

const mapStateToProps = state => {
  return {
    active: state => (state.activeTab === 0),
    value: state.config.value,
    cursor: state.config.cursorPos,
    selection: state.config.selection
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBeforeChange: editor => dispatch(updateConfigValue(editor.getValue())),
    onCursorActivity: editor => dispatch(updateConfigCursor(editor.getCursor())),
    onSelection: (selections) => dispatch(updateConfigSelection(selections)),
    onReady: (editor) => dispatch(fetchDefaultConfigValue(EDITOR_DEFAULTS_CONFIG_URL,(editor.getValue()==="")))
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
