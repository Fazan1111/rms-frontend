import React from "react";
import List from "../list/list";
import ActivityLogService from "../../services/activityLogService";
import Util from "../../util/util";

export default class ActivityLog extends List {
    constructor(props) {
        super(props);

        this.title = "User Activity";
        this.util = new Util();
        this.service = new ActivityLogService();

        this.columns = [
            {
                title: "Action Date",
                dataIndex: 'createdAt',
                key: 'createdAt',
                fixed: 'left',
                render: (createdAt) => {
                    return this.util.formatDate(createdAt);
                }
            },
            {
                title: "User Name",
                dataIndex: 'user',
                key: 'user',
                fixed: 'left',
                render: (user) => user.firstName + " " + user.lastName
            },
            {
                title: "Action",
                dataIndex: 'description',
                key: 'description',
                fixed: 'left'
            }
        ]
    }


    renderButtonAction() {
        return <div></div>
    }
}