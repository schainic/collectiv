import React from 'react';
import { withRouter } from 'react-router-dom';
import {GroupThumb} from '../components/GroupThumb.js';
import {GroupDetails} from '../components/GroupDetails.js';
import { getUserInfo } from '../functions/getUserInfo.js';
import { getGroupNames } from '../functions/getGroupNames.js';
import { getGroupObject } from '../functions/getGroupObject.js';


class GroupsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentGroup: null,
            groupsList: []
        }

        this.groupThumbClick = this.groupThumbClick.bind(this);
        this.groupNamesCallback = this.groupNamesCallback.bind(this);
        this.userInfoCallback = this.userInfoCallback.bind(this);
        this.loadGroupDescription = this.loadGroupDescription.bind(this);

        getUserInfo(this.userInfoCallback);
    }

    userInfoCallback(user) {
        if (user) {
            getGroupNames(this.groupNamesCallback);
        }
        else {
            this.props.history.push('/');
        }
    }

    groupNamesCallback(arr) {
        this.setState({groupsList: arr});
    }

    groupThumbClick(groupID) {
        var cb = this.loadGroupDescription;
        return (ev) => {
            getGroupObject(groupID, cb);
        };
    }

    loadGroupDescription(group) {
        if (group) {
            this.setState({currentGroup: group});
        }
    }

    render() {
        var that = this;
        var groupNamesContent = (<p>Test</p>);
        if (this.state.groupsList.length == 0) {
            groupNamesContent = (
                <div className="group-names">
                    <div className="section-header">
                        Your groups
                    </div>
                    <p>No groups!</p>
                </div>
            );
        }
        else {
            groupNamesContent = (
                <div className="group-names">
                    <div className="section-header">
                        Your groups
                    </div>
                    { this.state.groupsList.map( (g) => {
                        return (
                            <GroupThumb name={g.group_name} key={g.group_id} handleClick={that.groupThumbClick(g.group_id)} />
                        );
                    })}
                </div>
            )
        }

        return (
            <div className="groups-wrapper">
                { groupNamesContent }

				<div className="group-details">
                    <div className="section-header">
                        Group details
                    </div>
                    <GroupDetails group={this.state.currentGroup}/>
				</div>
            </div>
        );
    }
}

GroupsPage = withRouter(GroupsPage);

module.exports = {GroupsPage};
