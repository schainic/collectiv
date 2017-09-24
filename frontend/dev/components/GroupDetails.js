import React from 'react';
import { AddGroupMember } from './AddGroupMember.js';
import { addUserToGroup } from '../functions/addUserToGroup.js';

class GroupDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            group: props.group;
        }

        this.addUserToGroup = this.addUserToGroup.bind(this);
        this.addMemberCallback = this.addMemberCallback.bind(this);
    }

    addMemberSubmit(email) {
        addUserToGroup(this.state.group.group_id, email, this.addMemberCallback);
    }

    addMemberCallback(res, newUser) {
        if (res.statusCode == 200) {
            var newGroup = Object.assign(this.state.group, {});
            newGroup.users.push(newUser);
            this.setState({group: newGroup});
        }
        else {
            console.log('Error in addMemberCallback: ' + res.statusCode);
        }
    }

    render() {
        if (this.state.group) {
            var users = this.state.group.users;
            var funds = this.state.group.funds;
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
                        <AddGroupMember/>
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
