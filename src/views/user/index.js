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
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
                title: "Phone",
                dataIndex: 'phone',
                key: 'phone',
                fixed: 'left',
            },
            {
                title: "Email",
                dataIndex: 'email',
                key: 'email',
                fixed: 'left',
            },
            {
                title: "Address",
                dataIndex: 'address',
                key: 'address',
                fixed: 'left',
                render: (text, record) => record.address.city
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