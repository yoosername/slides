import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header/Header';
import Tabbable from './components/Tabbable/Tabbable';
import Editor from './components/Editor/Editor';
import Preview from './components/Preview/Preview';

import './App.css';

var DEFAULTS = {
  "config": { data : new Request("/config.js"), initialized: false },
  "content": { data : new Request("/presentation.html"), initialized : false }
}

export default class App extends Component {

  constructor(){
    super();
    this.setValue = this.setValue.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.isActive = this.isActive.bind(this);
    this.state = {
      activeTab: 0,
      config : "",
      content : ""
    };
  }

  isActive(idx){
    return ( this.state.activeTab === idx );
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onReady(id, editor, active){
    // on first activation set Cursor ( workaround bug where code invisble till you click first time )
    if( active && !DEFAULTS[id].initialized ){
      console.log("Activating tab: ", id,editor.getCursor());
      window.setTimeout(() => {
        editor.setCursor(editor.getCursor());
        DEFAULTS[id].initialized = true;
      },0);
    }
  }

  onEditorChange(id, editor, value){
    console.log("Saving contents of editor: ", id);
    localStorage.setItem(id, value);
  }

  onEditorCursor(id, editor, value){
    console.log("cursor change detected in editor ("+id+"): ", value);
  }

  loadDefaultOrSavedEditorData(id){
    var self = this;
    const cachedContent = localStorage.getItem(id);
    if (cachedContent) {
      console.log("Loaded editor from cache: ", id);
      this.setState({ [id]: cachedContent });
    }else{
      console.log("No cache found loading using default content from ", DEFAULTS[id].data);
      fetch(DEFAULTS[id].data)
      .then(response => {
        return response.text();
      })
      .then(text => {
        self.setState({ [id]: text });
        localStorage.setItem(id, text);
      })
    }
  }

  setValue(id, val){
    this.setState({[id] : val});
  }

  componentDidMount(){
    this.loadDefaultOrSavedEditorData("config");
    this.loadDefaultOrSavedEditorData("content");
  }

  render() {
    return (
      <Container fluid={true} className='App'>

        <Row>
          <Col>
            <Header />
            <Tabbable activeTab={this.state.activeTab} toggle={this.toggleTab}>
              <Editor
                active={this.isActive(0)}
                id="config"
                mode="javascript"
                theme="material"
                value={this.state.config}
                setValue={this.setValue}
                onReady={this.onReady}
                onChange={this.onEditorChange}
                onCursor={this.onEditorCursor}
              />
              <Editor
                active={this.isActive(1)}
                id="content"
                mode="htmlmixed"
                theme="material"
                value={this.state.content}
                setValue={this.setValue}
                onReady={this.onReady}
                onChange={this.onEditorChange}
                onCursor={this.onEditorCursor}
              />
            </Tabbable>
          </Col>
          <Col>
            <Preview src="preview.html"/>
          </Col>
        </Row>

      </Container>
    );
  }
}
