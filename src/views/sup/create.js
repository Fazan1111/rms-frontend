import React from "react";
import SupplierService from "../../services/SupplierService";
import Component from "../../share/component";


export default class FormCreate extends Component {
    constructor(props) {
        super(props);
        this.okTextModel = 'Save';
        this.state = {
            ...this.state,
            name: '',
            contact: '',
            email: '',
            address: '',
            note: '',
            newData: []
        }

        this.service = new SupplierService();
        this.handleName = this.handleName.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleNote = this.handleNote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit() {
        let data = {
            "name": this.state.name,
            "contact": this.state.contact,
            "email": this.state.email,
            "address": this.state.address,
            "note": this.state.note
        }
        
        this.insertSupplier(data);
        this.props.closeModal();
        this.message.success('item create success');
    }

    async insertSupplier(data) {
        try {
            this.setState({loading: true});
            const insert = await this.service.insert(data);
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

    render() {
        return (
            <this.Form 
                name="form_create" 
                layout="vertical"
                onFinish={() => this.handleSubmit()}
            >
                <this.Form.Item 
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input customer name!' }]}
                >
                    <this.Input onChange={this.handleName} />
                </this.Form.Item>

                <this.Form.Item 
                    name="phone"
                    label="Phone Number"
                >
                    <this.Input onChange={this.handlePhone} />
                </this.Form.Item>

                <this.Form.Item 
                    name="email"
                    label="Email"
                    rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        }
                    ]}
                >
                    <this.Input onChange={this.handleEmail} />
                </this.Form.Item>

                <this.Form.Item 
                    name="address"
                    label="Address"
                >
                    <this.Input onChange={this.handleAddress} />
                </this.Form.Item>

                <this.Form.Item
                    name="note"
                    label="Note"
                >
                    <this.TextArea maxLength={100} onChange={this.handleNote} />
                </this.Form.Item>

                <this.Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Save
                </this.Button>
            </this.Form>
        )
    }
}