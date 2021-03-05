import React from "react";
import List from "../list/list";
import CustomerService from "../../services/CustomerService";
import FormEdit from "./editForm";
import FormCreate from "./createForm";

export default class Customer extends List {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            data: []
        }
        this.columns = [
            {
                title: "Name",
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
                title: "Phone Number",
                dataIndex: 'contact',
                key: 'contact',
                fixed: 'left'
            },
            {
                title: "Email",
                dataIndex: 'email',
                key: 'email',
                fixed: 'left',
                sorter: (a, b) => a.email.length - b.email.length,
            },
            {
                title: "Address",
                dataIndex: 'address',
                key: 'address',
                fixed: 'left'
            }
        ]

        this.title = "Customer";
        this.service = new CustomerService();
        this.modalWidth = 600;
    }

    handleShowAddNewForm() {
        this.setState({
            modalVisible: true,
            modalContent: <FormCreate />,
        })
    }

    async handShowEditModal(id) {
        const response = await this.service.detail(id);
        console.log(response);
        this.setState({
            modalVisible: true,
            modalContent: <FormEdit formData={response.data} />
        })
    }
}