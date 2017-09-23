import React from 'react';
import { sendSignUpRequest } from '../functions/signUpRequest.js';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', pass: '', name: '', confirmPass: ''};

        // Bind functions
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	handleInputChange(e) {

		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

		this.setState({
			[e.target.name]:value
		});
	}

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.name, this.state.email, this.state.pass, this.state.confirmPass);

        // Dispatch action?
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
                </form>
            </div>
        );
    }
}

module.exports = {SignUpPage};
