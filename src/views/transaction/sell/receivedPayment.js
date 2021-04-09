import React from "react";
import Component from "../../../share/component";
import ReceivePaymentService from "../../../services/ReceivePaymentService";
import PaymentMethodService from "../../../services/PaymentMethodService";
import Util from "../../../util/util";
import EmployeeService from "../../../services/EmployeeService";
import Enum from "../../enum/index";
import SaleService from "../../../services/SaleService";

export default class ReceivedPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            newData: [],
            invoice: '',
            sellId: 0,
            payDate: '',
            tender: 0,
            customerName: '',
            amount: 0,
            receiveAmount: 0,
            saleDate: '',
            amountDue: 0,
            payMethods: [],
            employees: [],
        }

        this.service = new ReceivePaymentService();
        this.payMethodService = new PaymentMethodService();
        this.employeeService = new EmployeeService();
        this.saleService = new SaleService();
        this.util = new Util();
    }

    async getPaymentMethod() {
        const response = await this.payMethodService.list();
        if (response) {
            this.setState({payMethods: response.data});
        }
    }

    async getEmployeeList() {
        const response = await this.employeeService.list();
        if (response) {
            this.setState({employees: response.data});
        }
    }

    handleSubmit(value) {
        let payDate = value['payDate'].format('YYYY-MM-DD HH:mm:ss');
        const data = {
            "sellId": this.state.sellId,
            "employeeId": value.employeeId,
            "payDate": this.util.dateFormatForMySql(payDate),
            "tender": value.tender,
            "payMethodId": value.payMethodId
        }

        this.createPayment(data);
    }

    async createPayment(data) {
        try {
            this.setState({loading: true});
            const insert = await this.service.insert(data);
            if (insert) {
                if (insert.data.status === Enum.invoiceCodeError.INVOICE_NOT_FOUND) {
                    this.message.error(insert.data.message);
                } else if (insert.data.status === Enum.invoiceCodeError.INVOICE_HAS_PAID) {
                    this.message.error(insert.data.message)
                } else if (insert.data.status === Enum.invoiceCodeError.INVOICE_OVER_AMOUNT) {
                    this.message.error(insert.data.message);
                } else if (!insert.data.status) {
                    this.message.success('Create payment success');
                    const response = await this.saleService.list();
                    if (response) {
                        this.setState({
                            newData: response.data,
                            loading: false
                        })
                        this.props.closeModal();
                        this.props.parentCallBack(this.state.newData);
                    }
                }
            }
            this.setState({loading: false});
        } catch(err) {
            console.log('err', err);
            this.setState({loading: false});
        }
    }

    componentDidMount() {
        this.getPaymentMethod();
        this.getEmployeeList();
        this.setState({
            invoice: this.props.formData.invoice,
            sellId: this.props.formData.id,
            customerName: this.props.formData.customer.name,
            amount: this.props.formData.amount,
            amountDue: this.props.formData.finalAmount,
            saleDate: this.props.formData.sellDate
        })
    } 

    componentWillReceiveProps(newProps) {
        this.setState({
            invoice: newProps.formData.invoice,
            sellId: newProps.formData.id,
            customerName: newProps.formData.customer.name,
            amount: newProps.formData.amount,
            amountDue: newProps.formData.finalAmount,
            saleDate: newProps.formData.sellDate
        })
    }

    render() {
        return (
            <this.Form
                name="normal_login"
                className="purchase_form"
                initialValues={{
                    remember: true,
                }}
                layout="vertical"
                onFinish={(values) => this.handleSubmit(values)}
            >
                <div style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bold'}}>
                    Invoice No: {this.state.invoice}
                </div>

                <this.Row gutter={[8, 8, 8]} style={{marginTop: '30px'}}>
                    <this.Col span={8}>
                        <h4>Billed To: {this.state.customerName}</h4>
                    </this.Col>
                    <this.Col span={8}>
                        <h4>Sale Date: {this.util.formatDate(this.state.saleDate)}</h4>
                    </this.Col>
                </this.Row>

                <this.Row gutter={[8, 8, 8]}>
                    <this.Col span={8}>
                        <h4>Amount: {this.util.currencyFormat(this.state.amount)}</h4>
                    </this.Col>
                    <this.Col span={8}>
                        <h4>Received Amount: {this.util.currencyFormat(this.state.amount - this.state.amountDue)}</h4>
                    </this.Col>
                    <this.Col span={8}>
                        <h4>Amount Due: {this.util.currencyFormat(this.state.amountDue)}</h4>
                    </this.Col>
                </this.Row>

                <this.Divider />

                <this.Row gutter={[14, 14]}>
                    <this.Col span={12}>
                        <this.Form.Item
                            label="Paid Amount"
                            name="tender"
                            
                            rules={[{ required: true, message: 'Missing received payment amount' }]}
                        >
                            <this.InputNumber style={{width:'100%'}} type="number" placeholder="Paid Amount" />
                        </this.Form.Item>
                    </this.Col>
                    <this.Col span={12}>
                        <this.Form.Item 
                            name="payDate" 
                            label="Pay Date"
                            rules={[{required: true, message: "Messing paid date"}]}
                        >
                            <this.DatePicker style={{width: '100%'}} />
                        </this.Form.Item>
                    </this.Col>
                </this.Row>
                <this.Row gutter={[14, 14]}>
                    <this.Col span={12}>
                        <this.Form.Item 
                            label="Payment Method"
                            rules={[{required: true, message: "Missing Payment Method"}]}
                            name="payMethodId"
                        >
                            <this.Select
                                style={{ width: '100%' }}
                                placeholder="Select User Type"
                                
                            >
                                {this.state.payMethods.map((value) => 
                                    <this.Option value={value.id}>{value.name}</this.Option>
                                )}
                            </this.Select>
                        </this.Form.Item>
                    </this.Col>
                    <this.Col span={12}>
                        <this.Form.Item label="Received By" name="employeeId">
                            <this.Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                style={{with:'100%'}}
                            >
                                {this.state.employees.map((emp) =>
                                    <this.Option value={emp.id}>{emp.fname}</this.Option>
                                )}
                            </this.Select>
                        </this.Form.Item>
                    </this.Col>
                </this.Row>

                <this.Button htmlType="submit" type="primary" >
                    Save
                </this.Button>
            </this.Form>
        )
    }
}