import React from "react";
import EmployeeService from "../../services/EmployeeService";
import Component from "../../share/component";


export default class FormEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            id: 0,
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

    handleSubmit(e) {
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
        this.updateEmployee(data);
        this.props.closeModal();
        this.message.success('item create success');
    }

    async updateEmployee(data) {
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

    handlefName(e) {
        this.setState({fname: e.target.value});
    }

    handlelName(e) {
        this.setState({lname: e.target.value});
    }

    handlePhone(e) {
        this.setState({contact: e.target.value});
    }

    handleGender(gender) {
        this.setState({gender: gender});
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

    componentDidMount() {
        this.setState({
            id: this.props.formData.id,
            fname: this.props.formData.fname,
            lname: this.props.formData.lname,
            contact: this.props.formData.contact,
            gender: this.props.formData.gender,
            email: this.props.formData.email,
            address: this.props.formData.address,
            position: this.props.formData.position,
            idCard: this.props.formData.idCard
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            id: newProps.formData.id,
            fname: newProps.formData.fname,
            lname: newProps.formData.lname,
            contact: newProps.formData.contact,
            gender: newProps.formData.gender,
            email: newProps.formData.email,
            address: newProps.formData.address,
            position: newProps.formData.position,
            idCard: newProps.formData.idCard
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
                    label="First Name"
                    rules={[{ required: true, message: 'Please input customer name!' }]}
                >
                    <this.Input value={this.state.fname} onChange={this.handlefName} />
                </this.Form.Item>

                <this.Form.Item 
                    label="Last Name"
                    rules={[{ required: true, message: 'Please input customer name!' }]}
                >
                    <this.Input value={this.state.lname} onChange={this.handlelName} />
                </this.Form.Item>

                <this.Form.Item 
                    label="Phone Number"
                >
                    <this.Input value={this.state.contact} onChange={this.handlePhone} />
                </this.Form.Item>

                <this.Form.Item
                    label="Gender"
                    rules={[{required: true}]}
                >
                    <this.Select
                        labelInValue
                        defaultValue={{value: this.props.formData.gender}}
                        style={{ width: '100%' }}
                        placeholder="Select User Type"
                        name="userType"
                        onChange={this.handleGender}
                    >
                        <this.Option value={0}>Select Gender</this.Option>
                        <this.Option value={`male`}>Admin</this.Option>
                        <this.Option value={`female`}>Data entry</this.Option>
                    </this.Select>
                </this.Form.Item>

                <this.Form.Item 
                    label="Email"
                >
                    <this.Input value={this.state.email} onChange={this.handleEmail} />
                </this.Form.Item>

                <this.Form.Item 
                    label="Address"
                >
                    <this.Input value={this.state.address} onChange={this.handleAddress} />
                </this.Form.Item>

                <this.Form.Item
                    label="Position"
                >
                    <this.Input value={this.state.position} onChange={this.handlePosition} />
                </this.Form.Item>

                <this.Form.Item
                    label="IDCard"
                >
                    <this.Input value={this.state.idCard} onChange={this.handleIdCard} />
                </this.Form.Item>

                <this.Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Save
                </this.Button>
            </this.Form>
        )
    }
}