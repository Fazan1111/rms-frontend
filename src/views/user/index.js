import React from "react";
import UserService from "../../services/UserService";
import List from "../list/list";
import FormItem from "./form";
import {Modal} from "antd";

export default class UserList extends List {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "Name",
                dataIndex: 'userName',
                key: 'userName',
                fixed: 'left',
                sorter: (a, b) => a.userName.length - b.userName.length,
            },
            {
                title: "Email",
                dataIndex: 'email',
                key: 'email',
                fixed: 'left',
            }
        ]
    }

    title = "User";
    service = new UserService();

    handleModal() {
        return <Modal
        title={this.title}
        visible={this.state.visiblePopup}
        onOk={() => this.handleSubmit()}
        onCancel={() => this.handleCancel()}
        width={this.modalWidth}
      >
        <FormItem />
      </Modal>
    }
}