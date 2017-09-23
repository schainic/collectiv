import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getUserInfo } from '../functions/getUserInfo.js';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.userInfoCallback = this.userInfoCallback.bind(this);

        getUserInfo(this.userInfoCallback);
    }

    userInfoCallback(user) {
        if (user) {
            this.props.history.push('/groups/');
        }
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

LandingPage = withRouter(LandingPage);

module.exports = {LandingPage};
