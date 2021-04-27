import React from "react";
import SaleService from "../../../services/SaleService";
import List from "../../list/list";
import Util from "../../../util/util";
import FormCreate from "./create";
import Enum from "../../enum";
import ReceivedPayment from "./receivedPayment";
import SellInvoice from "./invoice";

export default class Sale extends List {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            invoiceId: 0,
            detail: {}
        }
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
                title: "Customer",
                dataIndex: 'customer',
                key: 'customer',
                fixed: 'left',
                render: (cus) => {
                    return cus.name;
                }
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
                title: "Invoice Status",
                dataIndex: 'status',
                key: 'status',
                fixed: 'left',
                render: (status) => {
                    if (status === Enum.invoiceStatus.PENDING) {
                        return <this.Tag style={{color: 'orange'}}>Pending</this.Tag>
                    } else if (status === Enum.invoiceStatus.SOME_PAY) {
                        return <this.Tag style={{color: 'blue'}}>Some Paid</this.Tag>
                    } else if (status === Enum.invoiceStatus.PAID) {
                        return <this.Tag style={{color: 'green'}}>Paid</this.Tag>
                    } else if (status === Enum.invoiceStatus.OVER_DUE) {
                        return <this.Tag style={{color: 'red'}}>Overdue</this.Tag>
                    }
                }
            },
            {
                title: "Action",
                dataIndex: "id",
                key: "id",
                fixed: "left",
                render: (id, record) => {
                    return (
                        <this.Dropdown overlay={() => this.MenuDropDown(record)} trigger={['click']}>
                            <this.Button size="small" className="ant-dropdown-link" onClick={() => this.setState({invoiceId: id})}>
                                Action <this.DownOutlined />
                            </this.Button>
                        </this.Dropdown>
                    )
                }
            }
        ]

        this.service = new SaleService();
        this.title = "Sale";
    }

    MenuDropDown(record) {
        return (
            <this.Menu>
                <this.Menu.Item key="0">
                    <li onClick={() => this.handleShowReceivedPayment(record)}>Add Payment</li>
                </this.Menu.Item>
                <this.Menu.Item key="1">
                    <li onClick={() => this.handleShowInvoice(record)}>View Invoice</li>
                </this.Menu.Item>
            </this.Menu>
        )
    }

    handleShowReceivedPayment(record) {
        this.title = "Receive Payment"
        this.setState({
            modalVisible: true,
            modalContent: <ReceivedPayment 
                form={this.props.form}
                formData={record}
                closeModal={this.onCloseModal}  
                parentCallBack={this.handleFormCreateCallBack}
            />
        })
    }

    async handleShowInvoice(record) {
        this.modalWidth = 800;
        this.title = "Sale Invoice"
        const detail = await this.getDetail(record.id);
        if (detail) {
            console.log('show invoice', detail);
            this.setState({
                modalVisible: true,
                modalContent: <SellInvoice
                    formData={detail}
                    closeModal={this.onCloseModal}
                />
            })
        }
        
    }

    handleShowAddNewForm() {
        this.title = "Create Sale"
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

    async getDetail(id) {
        try {
            this.setState({loading: true});
            const result = await this.service.detail(id);
            if (result) {
                this.setState({loading: false});
                return result.data;
            }
        } catch {
            this.setState({loading: false});
        }
    }
}