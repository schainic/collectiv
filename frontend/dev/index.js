import React from 'react';
import {render} from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {Textbox} from './components/Textbox.js';

class App extends React.Component {
  render () {
    return (
        <Router>
            <div>
                <h1>Test again</h1>
                <Route exact path="/" render={() =>
                    <Link to="/background/">Background</Link>
                } />
                <Route path="/background/" component={Textbox} />
            </div>
        </Router>
    );
  }
}

render(<App/>, document.getElementById('app'));
