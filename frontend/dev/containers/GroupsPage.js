import React from 'react';
import { withRouter } from 'react-router-dom';

class GroupsPage extends React.Component {

    render() {
        return (
            <div className="groups-wrapper">
                <div className="group-names">
				
				</div>
				
				<div className="group-details">
				
				</div>
            </div>
        );
    }
}

GroupsPage = withRouter(GroupsPage);

module.exports = {GroupsPage};
