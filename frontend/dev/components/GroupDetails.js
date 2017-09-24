import React from 'react';
import { AddGroupMember } from './AddGroupMember.js';
import { addUserToGroup } from '../functions/addUserToGroup.js';

class GroupDetails extends React.Component {
    constructor(props) {
        super(props);

        this.addMemberSubmit = this.addMemberSubmit.bind(this);
        this.addMemberCallback = this.addMemberCallback.bind(this);
    }

    addMemberSubmit(email) {
        console.log('Add member submit');
        addUserToGroup(this.props.group.group_id, email, this.addMemberCallback);
    }

    addMemberCallback(res, newUser) {
        if (res.statusCode == 200) {
            console.log('member added');
        }
        else {
            console.log('Error in addMemberCallback: ' + res.statusCode);
        }
    }

    render() {
        if (this.props.group) {
            var users = this.props.group.users;
            var funds = this.props.group.funds;
            return (
                <div className="group-details-content">
                    <div className="users-list">
                        <h2>Users</h2>
                        { users.map( (u) => {
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
                        { funds.map( (f) => {
                            return (
                                <div className="fund-thumb" key={f.fund_id}>
                                    <strong>{f.fund_name + ': '}</strong>
                                    ${f.balance}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

module.exports = {GroupDetails};
