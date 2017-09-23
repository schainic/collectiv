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
                        { users.map( (u) => {
                            return (
                                <div className="user-thumb">
                                    { u.name }
                                </div>
                            );
                        })}
                    </div>
                    <div className="funds-list">
                        { funds.map( (f) => {
                            return (
                                <div className="fund-thumb">
                                    <strong>{f.name + ': '}</strong>
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
