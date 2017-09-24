import React from 'react';
import { AddGroupMember } from './AddGroupMember.js';
import { addUserToGroup } from '../functions/addUserToGroup.js';
import { addMoneyToFund } from '../functions/addMoneyToFund.js';

import { AddFund } from './AddFund.js';
import { addFund } from '../functions/addFund.js';
import { DepositFund } from './DepositFund.js';

class GroupDetails extends React.Component {
    constructor(props) {
        super(props);

        this.addFund = addFund.bind(this);
        this.addMemberSubmit = this.addMemberSubmit.bind(this);
        this.addMemberCallback = this.addMemberCallback.bind(this);
        this.depositClick = this.depositClick.bind(this);
        this.depositCallback = this.depositCallback.bind(this);

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

    addMemberSubmit(email) {
        addUserToGroup(this.props.group.group_id, email, this.addMemberCallback);
    }

    addMemberCallback(res, newUser) {
        if (res.statusCode == 200) {
            var newUsers = this.state.users.slice();
            newUsers.push(newUser);
            this.setState({users: newUsers});
        }
        else {
            console.log('Error in addMemberCallback: ' + res.statusCode);
        }
    }

    depositClick(fid) {
        return (e) => {
            e.preventDefault();
            var amount = parseInt(prompt('How much money would you like to add to this fund? Please enter an amount in USD.', 0));
            if (!isNaN(amount)) {
                var group_id = this.props.group.group_id;
                addMoneyToFund(parseInt(group_id), parseInt(fid), amount, this.depositCallback);
            }
            else {
                alert('Invalid input.');
            }
        }
    }

    depositCallback(res, fund) {
        if (res.statusCode == 200) {
            var newFunds = this.state.funds.slice();
            for (var i = 0; i < newFunds.length; ++i) {
                if (newFunds[i].fund_id == fund.fund_id) {
                    newFunds[i] = fund;
                    break;
                }
            }
            this.setState({funds: newFunds});
        }
        else {
            console.error('Error in depositCallback: ' + res.statusCode);
        }
    }

    render() {
        var that = this;
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
                        <AddGroupMember handleSubmit={this.addMemberSubmit}/>
                    </div>
                    <div className="funds-list">
                        <h2>Funds</h2>
                        { this.state.funds.map( (f) => {
                            return (
                                <div className="fund-thumb" key={f.fund_id}>
                                    <strong>{f.fund_name + ': '}</strong>
                                    ${f.balance}
                                    <DepositFund clickHandler={that.depositClick(f.fund_id)}/>
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
            newFunds.push(fund);
            this.setState({funds: newFunds});
        }
        else {
            console.error('Bad result: ' + res.statusCode);
        }
    }
}

module.exports = {GroupDetails};
