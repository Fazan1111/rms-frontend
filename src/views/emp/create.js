import React from "react";
import EmployeeService from "../../services/EmployeeService";
import Component from "../../share/component";


export default class FormCreate extends Component {
    constructor(props) {
        super(props);
        this.okTextModel = 'Save';
        this.state = {
            ...this.state,
            fname: '',
            lname: '',
            contact: '',
            gender: '',
            email: '',
            address: '',
            position: '',
            idCard: '',
            newData: []
        }

        this.service = new EmployeeService();
        this.handlefName = this.handlefName.bind(this);
        this.handlelName = this.handlelName.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handlePosition = this.handlePosition.bind(this);
        this.handleIdCard = this.handleIdCard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCancel() {}

    async handleSubmit() {
        let data = {
            "fname": this.state.fname,
            "lname": this.state.lname,
            "contact": this.state.contact,
            "gender": this.state.gender,
            "email": this.state.email,
            "address": this.state.address,
            "position": this.state.position,
            "idCard": this.state.idCard
        }
        
        this.insertEmployee(data);
        this.props.closeModal();
        this.message.success('item create success');
    }

    async insertEmployee(data) {
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

    handlefName(e) {
        this.setState({fname: e.target.value});
    }

    handlelName(e) {
        this.setState({lname: e.target.value});
    }

    handlePhone(e) {
        this.setState({contact: e.target.value});
    }

    handleGender(e) {
        this.setState({gender: e});
    }

    handleEmail(e) {
        this.setState({email: e.target.value});
    }

    handleAddress(e) {
        this.setState({address: e.target.value});
    }

    handlePosition(e) {
        this.setState({position: e.target.value});
    }

    handleIdCard(e) {
        this.setState({idCard: e.target.value});
    }

    render() {
        return (
            <this.Form 
                name="form_create" 
                layout="vertical"
                onFinish={() => this.handleSubmit()}
            >
                <this.Form.Item 
                    name="fame"
                    label="First Name"
                    rules={[{ required: true, message: 'Please input your fist name!' }]}
                >
                    <this.Input onChange={this.handlefName} />
                </this.Form.Item>

                <this.Form.Item 
                    name="lname"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <this.Input onChange={this.handlelName} />
                </this.Form.Item>

                <this.Form.Item 
                    name="phone"
                    label="Phone Number"
                >
                    <this.Input onChange={this.handlePhone} />
                </this.Form.Item>

                <this.Form.Item
                    label="Gender"
                    rules={[{required: true}]}
                >
                    <this.Select
                        labelInValue
                        style={{ width: '100%' }}
                        placeholder="Select User Type"
                        name="gender"
                        onChange={this.handleUserType}
                    >
                        <this.Option value={0}>Select Gender</this.Option>
                        <this.Option value={`male`}>Male</this.Option>
                        <this.Option value={`female`}>Female</this.Option>
                    </this.Select>
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
                    name="position"
                    label="Position"
                >
                    <this.Input onChange={this.handlePosition} />
                </this.Form.Item>

                <this.Form.Item
                    name="IDCard"
                    label="IDCard"
                >
                    <this.Input onChange={this.handleIdCard} />
                </this.Form.Item>

                <this.Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Save
                </this.Button>
            </this.Form>
        )
    }
}