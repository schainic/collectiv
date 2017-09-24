import React from 'react';

class AddFund extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mode: 'button', name: ''};

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
        this.setState({name: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSubmit(this.state.name);
        this.cancel();
    }

    cancel(e) {
        if (e) e.preventDefault();
        this.setState({mode: 'button', name: ''});
    }

    render() {
        if (this.state.mode == 'button') {
            return (
                <button className="add-fund-btn" onClick={this.openForm}>Add fund</button>
            );
        }
        else if (this.state.mode == 'form') {
            return (
                <form onSubmit={this.handleSubmit} className="add-group-form">
                    <label htmlFor="group-name">Fund name</label>
                    <input type="text" name="group-name" onChange={this.handleChange} value={this.state.name}/>
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

module.exports = {AddFund};
