import React from 'react';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        // Bind functions
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        document.body.style.backgroundColor = this.state.value;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <input type="submit"/>
            </form>
        );
    }
}

module.exports = {LoginPage};
