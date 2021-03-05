import React from "react";
import CustomerService from "../../services/CustomerService";
import Component from "../../share/component";


export default class FormEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            name: '',
            contact: '',
            email: '',
            address: '',
            note: ''
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

        let id = this.props.formData.id;
        
        try {
            this.setState({
                modalVisible: false,
                loading: true
            });
            this.update(id, customer);
            this.message.success('Update success..............');
            window.location.reload(false);
        } catch {
            this.message.error('Error data not update! .........');
        }
        
    }

    async update(id, data) {
        await this.service.update(id, data);
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
            name: this.props.formData.name,
            contact: this.props.formData.contact,
            email: this.props.formData.email,
            address: this.props.formData.address,
            note: this.props.formData.note
        })
    }

    render() {
        console.log('mdal', this.state.modalVisible);
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
                    <this.Input defaultValue={this.props.formData.name} onChange={this.handleName} />
                </this.Form.Item>

                <this.Form.Item 
                    name="phone"
                    label="Phone Number"
                >
                    <this.Input defaultValue={this.props.formData.contact} onChange={this.handlePhone} />
                </this.Form.Item>

                <this.Form.Item 
                    name="email"
                    label="Email"
                >
                    <this.Input defaultValue={this.props.formData.email} onChange={this.handleEmail} />
                </this.Form.Item>

                <this.Form.Item 
                    name="address"
                    label="Address"
                >
                    <this.Input defaultValue={this.props.formData.address} onChange={this.handleAddress} />
                </this.Form.Item>

                <this.Form.Item
                    name="note"
                    label="Note"
                >
                    <this.TextArea maxLength={100} defaultValue={this.props.note} onChange={this.handleNote} />
                </this.Form.Item>

                <this.Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Save
                </this.Button>
            </this.Form>
        )
    }
}