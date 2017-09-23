import React from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        // this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return (
            <div className="body-content">
                <div className="landing-page">
                    <Link className="btn" to="/signup/">Sign Up</Link>
                    <Link className="btn" to="/login/">Login</Link>
                </div>
            </div>
        );
    }
}

module.exports = {LandingPage};
