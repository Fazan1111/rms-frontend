import React from "react";
import List from "../list/list";
import CustomerService from "../../services/CustomerService";
import FormUpdate from "./editForm";
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
            modalContent: <FormCreate 
                                closeModal={this.onCloseModal}  
                                parentCallBack={this.handleFormCreateCallBack}
                            />,
        })
    }

    async handShowEditModal(record) {
        const detail = await this.getDetail(record.id);
        if (detail) {
            this.setState({
                modalVisible: true,
                modalContent: <FormUpdate
                                formData={detail}
                                parentCallBack={this.handleFormUpdateCallBack}
                                closeModal={this.onCloseModal}
                             />
            })
        }
    }

    onCloseModal = () => {
        this.setState({modalVisible: false, loading: true});     
    }

    handleFormCreateCallBack = (newCreateData) => {
        this.setState({data: newCreateData, loading: false});
        console.log('chid data', newCreateData);
    }

    handleFormUpdateCallBack = (newUpdateData) => {
        this.setState({data: newUpdateData, loading: false});
        console.log(newUpdateData);
    }

    async getDetail(rowId) {
        try {
            this.setState({loading: true});
            const result = await this.service.detail(rowId);
            if (result) {
                this.setState({loading: false});
                return result.data;
            }
        } catch {
            this.setState({loading: false});
        }
    }
}