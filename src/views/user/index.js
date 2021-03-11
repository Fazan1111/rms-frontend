import React from "react";
import UserService from "../../services/UserService";
import List from "../list/list";
import FormCreate from "./formCreate";
import Enums from "../enum/index";
import FormEdit from "./formEdit";

export default class UserList extends List {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state
        }
        this.columns = [
            {
                title: "User Name",
                dataIndex: 'userName',
                key: 'userName',
                fixed: 'left',
                sorter: (a, b) => a.userName.length - b.userName.length,
            },
            {
                title: "User Type",
                dataIndex: 'userType',
                key: 'userType',
                fixed: 'left',
                render: (record, i) => {
                    if(record === Enums.userType.ADMIN) {
                        return "Admin";
                    }else if(record === Enums.userType.DATA_ENTRY) {
                        return "Data Entry";
                    }else if(record === Enums.userType.STOCK_CONTROLL) {
                        return "Stock Controller";
                    }
                }
            },
            {
                title: "Email",
                dataIndex: 'email',
                key: 'email',
                fixed: 'left',
                sorter: (a, b) => a.email.length - b.email.length,
            }
        ]

        this.service = new UserService();
        this.title = "User";
        this.modalWidth = 550;
    }


    handleShowAddNewForm() {
        this.setState({
            modalVisible: true,
            modalContent: <FormCreate />,
        })
    }

    handShowEditModal(record) {
        this.setState({
            modalVisible: true,
            modalContent: <FormEdit formData={record} />
        })
    }

}