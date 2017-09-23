import React from 'react';

class GroupThumb extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="group-thumb" onClick={this.props.handleClick}>
                {this.props.name}
            </div>
        )
    }
}

module.exports = {GroupThumb};
