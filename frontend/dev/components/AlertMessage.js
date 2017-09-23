import React from 'react';

class AlertMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.visible) {
            return (
                <p className={'alert-message ' + this.props.type}>
                    {this.props.text}
                </p>
            )
        }
        return null;
    }
}

module.exports = {AlertMessage};
