import React from "react";
import List from "../../list/list";
import FormUpdate from "./update";
import FormCreate from "./create";
import PurchaseService from "../../../services/PurchaseService";
import Util from "../../../util/util";

export default class Purchase extends List {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            data: [],
            employees: [],
            suppliers: [],
            products: []
        }
        this.util = new Util();
        this.columns = [
            {
                title: "Employee",
                dataIndex: 'employee',
                key: 'employee',
                fixed: 'left',
                render: (emp) => emp.fname + ' ' + emp.lname
            },
            {
                title: "Supplier",
                dataIndex: 'supplier',
                key: 'supplier',
                fixed: 'left',
                render: (sup) => sup.name
            },
            {
                title: "Invoice",
                dataIndex: 'invoice',
                key: 'invoice',
                fixed: 'left',
            },
            {
                title: "Amount",
                dataIndex: 'amount',
                key: 'amount',
                fixed: 'left',
                sorter: (a, b) => a.amount - b.amount,
                render: (amount, i) => {
                    return new Intl.NumberFormat().format(amount) + '៛';
                }
            },
            {
                title: "Purchase Date",
                dataIndex: 'purchaseDate',
                key: 'purchaseDate',
                fixed: 'left',
                render: (purDate) => {
                    return this.util.formatDate(purDate);
                }
            }
        ]

        this.title = "Purchase";
        this.service = new PurchaseService();
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

    // async handShowEditModal(record) {
    //     const detail = await this.getDetail(record.id);
    //     if (detail) {
    //         this.setState({
    //             modalVisible: true,
    //             modalContent: <FormUpdate
    //                             formData={detail}
    //                             parentCallBack={this.handleFormUpdateCallBack}
    //                             closeModal={this.onCloseModal}
    //                          />
    //         })
    //     }
    // }

    onCloseModal = () => {
        this.setState({modalVisible: false, loading: true});     
    }

    handleFormCreateCallBack = (newCreateData) => {
        this.setState({data: newCreateData, loading: false});
        console.log('chid data', newCreateData);
    }

    // handleFormUpdateCallBack = (newUpdateData) => {
    //     this.setState({data: newUpdateData, loading: false});
    //     console.log(newUpdateData);
    // }

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