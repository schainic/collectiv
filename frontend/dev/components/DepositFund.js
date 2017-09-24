import React from 'react';

class DepositFund extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'button'
        }
    }

    render() {
        if (this.state.mode == 'button') {
            return (
                <button className='deposit-btn' onClick={this.props.clickHandler}>+</button>
            )
        }
    }
}

module.exports = {DepositFund};
