import React from 'react';

class AddGroupMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mode: 'button', email: ''};

        // Bind functions
        this.openForm = this.openForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    openForm(e) {
        this.setState({mode: 'form'});
    }

    handleChange(e) {
        this.setState({email: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSubmit(this.state.email);
        this.cancel();
    }

    cancel(e) {
        if (e) e.preventDefault();
        this.setState({mode: 'button', email: ''});
    }

    render() {
        if (this.state.mode == 'button') {
            return (
                <button className="add-group-btn" onClick={this.openForm}>Add member</button>
            );
        }
        else if (this.state.mode == 'form') {
            return (
                <form onSubmit={this.handleSubmit} className="add-form">
                    <label htmlFor="group-name">Member email</label>
                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email}/>
                    <input type="submit"/>
                    <button onClick={this.cancel}>Cancel</button>
                </form>
            );
        }
        else {
            return null;
        }
    }
}

module.exports = {AddGroupMember};
