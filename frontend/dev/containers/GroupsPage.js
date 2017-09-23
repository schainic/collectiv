import React from 'react';
import { withRouter } from 'react-router-dom';

class GroupsPage extends React.Component {

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

GroupsPage = withRouter(GroupsPage);

module.exports = {GroupsPage};
