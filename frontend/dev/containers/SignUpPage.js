import React from 'react';
import { withRouter } from 'react-router-dom';
import { sendSignUpRequest } from '../functions/signUpRequest.js';
import { AlertMessage } from '../components/AlertMessage.js';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', pass: '', name: '', confirmPass: '',
            alertVisible: false,
            alertText: '',
            alertType: ''
        };

        // Bind functions
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.responseCallback = this.responseCallback.bind(this);
    }

	handleInputChange(e) {

		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

		this.setState({
			[e.target.name]:value
		});
	}

    responseCallback(res, body) {
        if (res.statusCode == 200) {
            this.props.history.push('/groups/');
        }
        else {
            this.setState({
                alertVisible: true,
                alertText: 'Error with sign up: ' + res.statusCode,
                alertType: 'error'
            })
        }
        return;
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.name.length == 0 || this.state.pass.length == 0 || this.state.email.length == 0 ||
            this.state.confirmPass.length == 0) {
            alert("Please fill out all fields");
        }
        else if (this.state.pass != this.state.confirmPass) {
            alert("Password and confirm password do not match");
        }
        else {
            console.log('Function: ' + this.responseCallback);
            sendSignUpRequest(this.state.name, this.state.email, this.state.pass, this.responseCallback);
        }

    }

    render() {
        return (
            <div className="body-content">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <h1>Sign Up</h1>
                    <div className="input-section">
                        <label htmlFor="name">Name:</label>
                        <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange}/>
                    </div>
                    <div className="input-section">
                        <label htmlFor="email">Email:</label>
                        <input name="email" type="text" value={this.state.email} onChange={this.handleInputChange}/>
                    </div>
                    <div className="input-section">
                        <label htmlFor="pass">Password:</label>
                        <input name="pass" type="password" value={this.state.pass} onChange={this.handleInputChange}/>
                    </div>
                    <div className="input-section">
                        <label htmlFor="confirmPass">Confirm password:</label>
                        <input name="confirmPass" type="password" value={this.state.confirmPass} onChange={this.handleInputChange}/>
                    </div>
                    <input type="submit"/>
                    <AlertMessage visible={this.state.alertVisible} type={this.state.alertType} text={this.state.alertText} />
                </form>
            </div>
        );
    }
}

SignUpPage = withRouter(SignUpPage);

module.exports = {SignUpPage};
