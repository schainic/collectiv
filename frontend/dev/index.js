import React from 'react';
import {render} from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {Textbox} from './components/Textbox.js';
import {Header} from './components/Header.js';
import {LoginPage} from './containers/LoginPage.js';

class App extends React.Component {
  render () {
    return (
        <Router>
            <div>
                <Header/>
                <Route exact path="/" render={() =>
                    <Link to="/login/">login</Link>
                } />
                <Route exact path="/login/" component={LoginPage} />
            </div>
        </Router>
    );
  }
}

render(<App/>, document.getElementById('app'));
