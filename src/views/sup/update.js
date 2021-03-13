import React from "react";
import SupplierService from "../../services/SupplierService";
import Component from "../../share/component";


export default class FormUpdate extends Component {
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
        
        this.updateSupplier(data);
        this.props.closeModal();
        this.message.success('item update success');
    }

    async updateSupplier(data) {
        try {
            this.setState({loading: true});
            const update = await this.service.update(this.state.id, data);
            if (update) {
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
                name="form_create" 
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
                    rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        }
                    ]}
                >
                    <this.Input value={this.state.email} onChange={this.handleEmail} />
                </this.Form.Item>

                <this.Form.Item 
                    label="Address"
                >
                    <this.Input value={this.state.address} onChange={this.handleAddress} />
                </this.Form.Item>

                <this.Form.Item
                    label="Note"
                >
                    <this.TextArea value={this.state.note} onChange={this.handleNote} />
                </this.Form.Item>

                <this.Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Update
                </this.Button>
            </this.Form>
        )
    }
}