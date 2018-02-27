import React from 'react';
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header/Header';
import Tabbable from './components/Tabbable/Tabbable';
import ConfigEditor from './components/Editor/ConfigEditor';
import ContentEditor from './components/Editor/ContentEditor';
import Preview from './components/Preview/Preview';

import {
  toggleTab
} from "./state/actions/index";

import './App.css';

export const AppUI = (props) => (

      <Container fluid={true} className='App'>

        <Row>
          <Col>
            <Header />
            <Tabbable activeTab={props.activeTab} toggle={props.toggleTab}>
              <ConfigEditor id="config"/>
              <ContentEditor id="content"/>
            </Tabbable>
          </Col>
          <Col>
            <Preview src="preview.html"/>
          </Col>
        </Row>

      </Container>
);

const mapStateToProps = state => {
  return {
    activeTab: state.tabs.activeTab
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleTab: tab => dispatch(toggleTab(tab))
  };
};

const App = connect(mapStateToProps,mapDispatchToProps)(AppUI);
export default App;
