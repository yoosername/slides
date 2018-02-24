import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header/Header';
import Tabbable from './components/Tabbable/Tabbable';
import Editor from './components/Editor/Editor';
import Preview from './components/Preview/Preview';

import './App.css';

export default class App extends Component {

  constructor(){
    super();

    this.state = {
      activeTab: 0,
      configEditorValue : "Config Editor",
      configEditorCursorPos : {line: 0, ch: 0, sticky: null},
      contentEditorValue : "Content Editor",
      contentEditorCursorPos : {line: 0, ch: 0, sticky: null}
    };

    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount(){
    this.hydrate("config:data", "/config.js", "configEditorValue");
    this.hydrate("content:data", "/presentation.html", "contentEditorValue");
  }

  hydrate(cache_key, url, state_key){

    var self = this;
    var req = new Request(url);

    const cached = localStorage.getItem(cache_key);
    if (cached) {
      console.log("[Editor] loaded from Localstorage using key: ", cache_key);
      this.setState({ [state_key]: cached });
    }else{
      console.log("[Editor] No cache found using key ("+cache_key+") loading default content from: ", url);
      fetch(req)
      .then(response => {
        return response.text();
      })
      .then(content => {
        console.log("[Editor] default content loaded successfully ");
        self.setState({ [state_key]: content });
        localStorage.setItem(cache_key, content);
      })
    }
  }

  render() {
    return (
      <Container fluid={true} className='App'>

        <Row>
          <Col>
            <Header />
            <Tabbable activeTab={this.state.activeTab} toggle={this.toggleTab}>
              <Editor
                id="config"
                value={this.state.configEditorValue}
                cursor={this.state.configEditorCursorPos}
                options={{
                  mode: "javascript",
                  theme: "material"
                }}
                onBeforeChange={(editor)=>{
                  this.setState({ "configEditorValue": editor.getValue() });
                }}
                onChange={(editor, val)=>{
                  localStorage.setItem("config:data", val);
                }}
                onCursorActivity={(editor, cursor)=>{
                  this.setState({ "configEditorCursorPos": editor.getCursor()  });
                  //localStorage.setItem("config:cursor", JSON.stringify(editor.getCursor()));
                }}
              />
              <Editor
                id="content"
                value={this.state.contentEditorValue}
                cursor={this.state.contentEditorCursorPos}
                options={{
                  mode: "htmlmixed",
                  theme: "material"
                }}
                onBeforeChange={(editor)=>{
                  this.setState({ "contentEditorValue": editor.getValue() });
                }}
                onChange={(editor, val)=>{
                  localStorage.setItem("content:data", val);
                }}
                onCursorActivity={(editor, cursor)=>{
                  this.setState({ "contentEditorCursorPos": editor.getCursor() });
                  //localStorage.setItem("content:cursor", JSON.stringify(editor.getCursor()));
                }}
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
