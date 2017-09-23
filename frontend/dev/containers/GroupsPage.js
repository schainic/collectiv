import React from 'react';
import { withRouter } from 'react-router-dom';
import {GroupThumb} from '../components/GroupThumb.js';

class GroupsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentGroup: null,
            groupsList: [{name: 'group1', id: 1}, {name: 'group2', id: 2}]
        }

        this.groupThumbClick = this.groupThumbClick.bind(this);
    }

    groupThumbClick(groupID) {
        return (ev) => {
            console.log(groupID);
        };
    }

    render() {
        var that = this;
        var groupNamesContent = (<p>Test</p>);
        if (this.state.groupsList.length == 0) {
            groupNamesContent = (
                <div className="group-names">
                    <p>No groups!</p>
                </div>
            );
        }
        else {
            groupNamesContent = (
                <div className="group-names">
                    { this.state.groupsList.map( (g) => {
                        return (
                            <GroupThumb name={g.group_name} key={g.id} onClick={that.groupThumbClick(g.group_id)} />
                        );
                    })}
                </div>
            )
        }

        return (
            <div className="groups-wrapper">
                { groupNamesContent }

				<div className="group-details">

				</div>
            </div>
        );
    }
}

GroupsPage = withRouter(GroupsPage);

module.exports = {GroupsPage};
