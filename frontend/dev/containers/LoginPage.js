import React from 'react';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', pass: ''};

        // Bind functions
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    handleChangePass(e) {
        this.setState({pass: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        // Dispatch action?
    }

    render() {
        return (
            <div className="body-content">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <input type="text" value={this.state.email} onChange={this.handleChangeEmail}/>
                    <input type="password" value={this.state.pass} onChange={this.handleChangePass}/>
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

module.exports = {LoginPage};
