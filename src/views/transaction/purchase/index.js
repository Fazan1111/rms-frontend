import React from "react";
import List from "../../list/list";
import FormUpdate from "./update";
import FormCreate from "./create";
import PurchaseService from "../../../services/PurchaseService";
import Util from "../../../util/util";
import "./style.css";

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
                title: "Purchase Date",
                dataIndex: 'purchaseDate',
                key: 'purchaseDate',
                fixed: 'left',
                sorter: (a, b) => a.purchaseDate.length - b.purchaseDate.length,
                render: (purDate) => {
                    return this.util.formatDate(purDate);
                }
            },
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
                title: "Amount",
                dataIndex: 'amount',
                key: 'amount',
                fixed: 'left',
                sorter: (a, b) => a.amount - b.amount,
                render: (amount, i) => {
                    return new Intl.NumberFormat().format(amount) + '៛';
                }
            }
        ]

        this.title = "Purchase";
        this.service = new PurchaseService();
        this.modalWidth = 800;
    }

    handleShowAddNewForm() {
        this.title = "Make Purchase Order";
        this.setState({
            modalVisible: true,
            modalContent: <FormCreate 
                                form={this.props.form}
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

    renderTableExpen(data) {
        return (
            <table border="1" style={{borderCollapse: 'collapse'}}>
                <thead >
                    <tr>
                        <th>N&deg;</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, i) => 
                            <tr key={i}>
                                <td style={{width: '40px', textAlign: 'center'}}>{i+1}</td>
                                <td style={{padding: '8px'}}>{row.product.name}</td>
                                <td style={{padding: '8px'}}>{new Intl.NumberFormat().format(row.qty) + 'Kg'}</td>
                                <td style={{padding: '8px'}}>{new Intl.NumberFormat().format(row.price) + '៛/50Kg'}</td>
                                <td style={{padding: '8px'}}>{new Intl.NumberFormat().format(row.amount) + '៛'}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }

    renderTable() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <this.Table
                columns={this.columns}
                dataSource={this.state.data}
                expandable={{
                    expandedRowRender: record => this.renderTableExpen(record.purchaseItems),
                    rowExpandable: record => record.price !== 'Not Expandable',
                  }}
                onRow={record => ({
                    onDoubleClick: () => this.handShowEditModal(record)
                })}
                rowSelection={rowSelection}
                loading={this.state.loading}
                rowKey={record => record.id}
                size="middle"
            />
        )
    }

}