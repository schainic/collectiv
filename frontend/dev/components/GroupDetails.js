import React from 'react';

class GroupDetails extends React.Component {
    constructor(props) {
        super(props);
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
                            console.log(u);
                            return (
                                <div className="user-thumb" key={u.user_id}>
                                    { u.name }
                                </div>
                            );
                        })}
                    </div>
                    <div className="funds-list">
                        <h2>Funds</h2>
                        { funds.map( (f) => {
                            console.log(f);
                            return (
                                <div className="fund-thumb" key={f.fund_id}>
                                    <strong>{f.fund_name + ': '}</strong>
                                    {f.balance}
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
