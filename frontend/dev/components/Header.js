import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        // this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div className="header">
                <h1>Collectiv</h1>
            </div>
        );
    }
}

module.exports = {Header};
