import React from "react";
import SaleService from "../../../services/SaleService";
import List from "../../list/list";
import Util from "../../../util/util";
import FormCreate from "./create";


export default class Sale extends List {
    constructor(props) {
        super(props);
        this.util = new Util();
        this.columns = [
            {
                title: "Sale Date",
                dataIndex: 'saleDate',
                key: 'saleDate',
                fixed: 'left',
                render: (saleDate) => {
                    return this.util.formatDate(saleDate);
                }
            },
            {
                title: "Invoice",
                dataIndex: 'invoice',
                key: 'invoice',
                fixed: 'left'
            },
            {
                title: "Employee",
                dataIndex: 'employee',
                key: 'employee',
                fixed: 'left',
                render: (emp) => emp.fname + ' ' + emp.lname
            },
            {
                title: "Customer",
                dataIndex: 'customer',
                key: 'customer',
                fixed: 'left',
                render: (cus) => cus.name
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

        this.service = new SaleService();
        this.title = "Sale";
    }

    handleShowAddNewForm() {
        this.setState({
            modalVisible: true,
            modalContent: <FormCreate 
                                form={this.props.form}
                                closeModal={this.onCloseModal}  
                                parentCallBack={this.handleFormCreateCallBack}
                            />,
        })
    }

    onCloseModal = () => {
        this.setState({modalVisible: false, loading: true});     
    }

    handleFormCreateCallBack = (newCreateData) => {
        this.setState({data: newCreateData, loading: false});
        console.log('chid data', newCreateData);
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
                    expandedRowRender: record => this.renderTableExpen(record.sellItems),
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