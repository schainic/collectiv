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
import {SignUpPage} from './containers/SignUpPage.js';

class App extends React.Component {
  render () {
    return (
        <Router>
            <div>
                <Header/>
                <Route exact path="/" render={() =>
                    <div>
                        <Link to="/login/">login</Link><br/>
                        <Link to="/signup/">Sign up</Link>
                    </div>
                } />
                <Route exact path="/login/" component={LoginPage} />
                <Route exact path="/signup/" component={SignUpPage} />
            </div>
        </Router>
    );
  }
}

render(<App/>, document.getElementById('app'));
