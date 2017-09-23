import React from 'react';
import { withRouter } from 'react-router-dom';
import { sendLoginRequest } from '../functions/loginRequest.js';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', pass: ''};

        // Bind functions
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.responseCallback = this.responseCallback.bind(this);
    }

    responseCallback(res, body) {
        if (res.statusCode == 200) {
            // login success
            this.props.history.push('/groups/');
        }
        else {
            alert('Login failed');
            this.setState({email: '', pass: ''});
        }
    }

	handleInputChange(e) {

		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

		this.setState({
			[e.target.name]:value
		});
	}

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.email.length == 0 || this.state.pass.length == 0) {
            alert('Missing email or password!');
        }
        else {
            sendLoginRequest(this.state.email, this.state.pass, this.responseCallback);
        }
    }

    render() {
        return (
            <div className="body-content">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-section">
                        <label htmlFor="email">Email:</label>
                        <input name="email" type="text" value={this.state.email} onChange={this.handleInputChange}/>
                    </div>
                    <div className="input-section">
                        <label htmlFor="pass">Password:</label>
                        <input name="pass" type="password" value={this.state.pass} onChange={this.handleInputChange}/>
                    </div>
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

LoginPage = withRouter(LoginPage);

module.exports = {LoginPage};
