import React from "react";
import CustomerService from "../../services/CustomerService";
import Component from "../../share/component";


export default class FormEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            id: 0,
            name: '',
            contact: '',
            email: '',
            address: '',
            note: '',
            newData: []
        }

        this.service = new CustomerService();
        this.handleName = this.handleName.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleNote = this.handleNote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        let customer = {
            "name": this.state.name,
            "contact": this.state.contact,
            "email": this.state.email,
            "address": this.state.address,
            "note": this.state.note
        }
        this.updateCustomer(customer);
        this.props.closeModal();
        this.message.success('item create success');
    }

    async updateCustomer(data) {
        try {
            this.setState({loading: true});
            const insert = await this.service.update(this.state.id, data);
            if (insert) {
                const response = await this.service.list();
                if (response) {
                    this.setState({
                        newData: response.data,
                        loading: false
                    })
                    this.props.parentCallBack(this.state.newData);
                }
            }
            this.setState({loading: false});
        } catch {
            this.setState({loading: false});
        }
    }

    handleName(e) {
        this.setState({name: e.target.value});
    }

    handlePhone(e) {
        this.setState({contact: e.target.value});
    }

    handleEmail(e) {
        this.setState({email: e.target.value});
    }

    handleAddress(e) {
        this.setState({address: e.target.value});
    }

    handleNote(e) {
        this.setState({note: e.target.value});
    }

    componentDidMount() {
        this.setState({
            id: this.props.formData.id,
            name: this.props.formData.name,
            contact: this.props.formData.contact,
            email: this.props.formData.email,
            address: this.props.formData.address,
            note: this.props.formData.note
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            id: newProps.formData.id,
            name: newProps.formData.name,
            contact: newProps.formData.contact,
            email: newProps.formData.email,
            address: newProps.formData.address,
            note: newProps.formData.note
        })
    }

    render() {
        return (
            <this.Form 
                name="form_update" 
                layout="vertical"
                onFinish={() => this.handleSubmit()}
            >
                <this.Form.Item 
                    label="Name"
                    rules={[{ required: true, message: 'Please input customer name!' }]}
                >
                    <this.Input value={this.state.name} onChange={this.handleName} />
                </this.Form.Item>

                <this.Form.Item 
                    label="Phone Number"
                >
                    <this.Input value={this.state.contact} onChange={this.handlePhone} />
                </this.Form.Item>

                <this.Form.Item 
                    label="Email"
                >
                    <this.Input value={this.state.email} onChange={this.handleEmail} />
                </this.Form.Item>

                <this.Form.Item 
                    name="address"
                    label="Address"
                >
                    <this.Input value={this.state.address} onChange={this.handleAddress} />
                </this.Form.Item>

                <this.Form.Item
                    name="note"
                    label="Note"
                >
                    <this.TextArea value={this.state.note} onChange={this.handleNote} />
                </this.Form.Item>

                <this.Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Save
                </this.Button>
            </this.Form>
        )
    }
}