import React from 'react';
import {render} from 'react-dom';
import {Textbox} from './components/Textbox.js';

class App extends React.Component {
  render () {
    return (
        <div>
            <Textbox/>
        </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
