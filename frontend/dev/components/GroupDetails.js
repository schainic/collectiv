import React from 'react';

import { AddFund } from './AddFund.js';
import { addFund } from '../functions/addFund.js';

class GroupDetails extends React.Component {
    constructor(props) {
        super(props);

        this.addFund = addFund.bind(this);

        this.state = {
            users: (props.group) ? props.group.users : null,
            funds: (props.group) ? props.group.funds : null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            users: (nextProps.group) ? nextProps.group.users : null,
            funds: (nextProps.group) ? nextProps.group.funds : null
        });
    }

    render() {
        if (this.props.group) {
            return (
                <div className="group-details-content">
                    <div className="users-list">
                        <h2>Users</h2>
                        { this.state.users.map( (u) => {
                            return (
                                <div className="user-thumb" key={u.user_id}>
                                    { u.name }
                                </div>
                            );
                        })}
                    </div>
                    <div className="funds-list">
                        <h2>Funds</h2>
                        { this.state.funds.map( (f) => {
                            return (
                                <div className="fund-thumb" key={f.fund_id}>
                                    <strong>{f.fund_name + ': '}</strong>
                                    ${f.balance}
                                </div>
                            );
                        })}

                        <AddFund handleSubmit={this.addFundSubmit.bind(this)}/>
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }

    addFundSubmit(fundName) {
        this.addFund(fundName, this.props.group.group_id, this.addFundCallback.bind(this));
    }

    addFundCallback(res, fund) {
        if (res.statusCode == 200) {
            var newFunds = this.state.funds.slice();
            newFunds.push(JSON.parse(fund));
            this.setState({funds: newFunds});
        }
        else {
            console.error('Bad result: ' + res.statusCode);
        }
    }
}

module.exports = {GroupDetails};
