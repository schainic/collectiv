import React from 'react';
import { withRouter } from 'react-router-dom';
import {GroupThumb} from '../components/GroupThumb.js';
import {GroupDetails} from '../components/GroupDetails.js';
import { AddGroup } from '../components/AddGroup.js';
import { getUserInfo } from '../functions/getUserInfo.js';
import { getGroupNames } from '../functions/getGroupNames.js';
import { getGroupObject } from '../functions/getGroupObject.js';
import { addGroupRequest } from '../functions/addGroupRequest.js';

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
        this.addGroupCallback = this.addGroupCallback.bind(this);
        this.addGroupSubmit = this.addGroupSubmit.bind(this);

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

    addGroupSubmit(name) {
        addGroupRequest(name, this.addGroupCallback);
    }

    addGroupCallback(res, group) {
        console.log(group);
        if (res.statusCode == 200) {
            getGroupObject(group.group_id, loadGroupDescription);
        }
        else {
            console.error('Bad result: ' + res.statusCode);
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
                    <AddGroup handleSubmit={this.addGroupSubmit}/>
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
                    <AddGroup handleSubmit={this.addGroupSubmit}/>
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
