import React from "react";
import List from "../list/list";
import CategoryService from "../../services/CategoryService";
import FormCreate from "./formCreate";
import FormUpdate from "./formUpdate";

export default class Category extends List {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state
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
                title: "Code",
                dataIndex: 'code',
                key: 'code',
                fixed: 'left',
            },
            {
                title: "note",
                dataIndex: 'note',
                key: 'note',
                fixed: 'left',
            },
        ]

        this.service = new CategoryService();
        this.title = 'Category';
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