import React from "react";
import UserService from "../../services/UserService";
import Component from "../../share/component";
import Enums from "../enum/index";


export default class FormUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            id: 0,
            fname: '',
            lname: '',
            username: '',
            userType: 0,
            email: '',
            loading: false,
            newData: []
        }

        this.handleFname = this.handleFname.bind(this);
        this.handleLname = this.handleLname.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleUserType = this.handleUserType.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
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

    async handleSubmit() {
        this.setState({loading: true, modalVisible: false});
        let user = {
            "roleId": 1,
            "firstName": this.state.fname,
            "lastName": this.state.lname,
            "userName": this.state.username,
            "userType": this.state.userType,
            "email": this.state.email,
        }
        
        this.updateUser(user);
        this.props.closeModal();
        this.message.success('User information update success');
    }

    async updateUser(data) {
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

    componentDidMount() {
        this.setState({
            id: this.props.formData.id,
            fname: this.props.formData.firstName,
            lname: this.props.formData.lastName,
            username: this.props.formData.userName,
            userType: this.props.formData.userType,
            email: this.props.formData.email
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            id: newProps.formData.id,
            fname: newProps.formData.firstName,
            lname: newProps.formData.lastName,
            username: newProps.formData.userName,
            userType: newProps.formData.userType,
            email: newProps.formData.email
        })
    }

    handleCancel() {
        this.setState({modalVisible: false});
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
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <this.Input value={this.state.fname}  onChange={this.handleFname} />
                </this.Form.Item>

                <this.Form.Item
                    label="Last Name"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <this.Input value={this.state.lname}  onChange={this.handleLname} />
                </this.Form.Item>

                <this.Form.Item
                    label="User Name"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <this.Input value={this.state.username} onChange={this.handleUsername} />
                </this.Form.Item>

                <this.Form.Item
                    label="User Type"
                    rules={[{required: true}]}
                >
                    <this.Select
                        labelInValue
                        value={{value: this.state.userType}}
                        style={{ width: '100%' }}
                        placeholder="Select User Type"
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
                    rules={[
                        { required: true, message: 'Please input your last name!' },
                        { type: 'email', message: 'The input is not valid E-mail!'}
                    ]}
                >
                    <this.Input value={this.state.email} onChange={this.handleEmail} />
                </this.Form.Item>

                <this.Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Save
                </this.Button>
            </this.Form>
        )
    }
}