import React from 'react';
import ReactDOM from 'react-dom';
import Tabbable from './Tabbable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tabbable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
