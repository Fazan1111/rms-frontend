import React from "react";
import UserService from "../../services/UserService";
import Component from "../../share/component";
import Enums from "../enum/index";


export default class FormCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            fname: '',
            lname: '',
            username: '',
            userType: 0,
            email: '',
            password: '',
            loading: false,
            newData: []
        }

        this.handleFname = this.handleFname.bind(this);
        this.handleLname = this.handleLname.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleUserType = this.handleUserType.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.service = new UserService();
    }

    handleFname(e) {
        this.setState({fname: e.target.value});
    }

    handleLname(e) {
        this.setState({lname: e.target.value});
    }

    handleUsername(e) {
        this.setState({username: e.target.value});
    }

    handleUserType(value) {
        console.log(value.value);
        this.setState({userType: value.value});
    }

    handleEmail(e) {
        this.setState({email: e.target.value});
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    }

    async handleSubmit() {
        this.setState({loading: true});
        let data = {
            "roleId": 1,
            "firstName": this.state.fname,
            "lastName": this.state.lname,
            "userName": this.state.username,
            "userType": this.state.userType,
            "email": this.state.email,
            "password": this.state.password
        }
        this.insertUser(data);
        this.props.closeModal();
        this.message.success('item create success');
    }

    async insertUser(data) {
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

    render() {
        return (
            <this.Form 
                name="formUser" 
                layout="vertical"
                onFinish={() => this.handleSubmit()}
            >
                <this.Form.Item
                    label="First Name"
                    name="fname"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <this.Input onChange={this.handleFname} />
                </this.Form.Item>

                <this.Form.Item
                    label="Last Name"
                    name="lname"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <this.Input onChange={this.handleLname} />
                </this.Form.Item>

                <this.Form.Item
                    label="User Name"
                    name="username"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <this.Input onChange={this.handleUsername} />
                </this.Form.Item>

                <this.Form.Item
                    label="User Type"
                    rules={[{required: true}]}
                >
                    <this.Select
                        labelInValue="Payment Method"
                        style={{ width: '100%' }}
                        placeholder="Select User Type"
                        name="userType"
                        onChange={this.handleUserType}
                    >
                        <this.Option value={0}>Select User Type</this.Option>
                        <this.Option value={Enums.userType.ADMIN}>Admin</this.Option>
                        <this.Option value={Enums.userType.DATA_ENTRY}>Data entry</this.Option>
                        <this.Option value={Enums.userType.STOCK_CONTROLL}>Stock Controller</this.Option>
                    </this.Select>
                </this.Form.Item>

                <this.Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your last name!' },
                        { type: 'email', message: 'The input is not valid E-mail!'}
                    ]}
                >
                    <this.Input onChange={this.handleEmail} />
                </this.Form.Item>

                <this.Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <this.Input.Password onChange={this.handlePassword} />
                </this.Form.Item>

                <this.Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Save
                </this.Button>
            </this.Form>
        )
    }
}