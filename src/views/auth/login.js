import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import App from "../../App";
import "./auth.css";
import { Redirect } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            username: '',
            password: '',
            error: false,
            redirect: false,
            loading: false
        }
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async userLogin() {
        return axios({
            method: "POST",
            url: "http://127.0.0.1:9000/auth/login",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                userName: this.state.username,
                password: this.state.password
            }
        })
    }

    async handleSubmit(e) {
        this.setState({error: false});
        localStorage.clear();
        console.log(localStorage.getItem('accessToken'));
        try {
            const response = await this.userLogin();
            if (response.data && response.data.access_token) {
                localStorage.setItem('accessToken', response.data.access_token);
                localStorage.setItem('userType', response.data.userRole);
                //this.setState({redirect: true, loading: true});
                //window.location.reload();
                this.setState({token: response.data.access_token});
            } else {
                this.setState({error: true});
            }
        } catch {
            this.setState({error: true});
        }
    }

    handleChangeName(e) {
        this.setState({username: e.target.value});
    }

    handleChangePass(e) {
        this.setState({password: e.target.value});
    }

    render() {

        if (this.state.token) {
            return <App />
        }
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: false,
                }}
                onFinish={this.handleSubmit}
            >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                    
                >
                    <Input 
                        name='username'
                        type='text'
                        prefix={<UserOutlined 
                        className="site-form-item-icon" 
                        />} 
                        defaultValue=''
                        onChange={this.handleChangeName}
                        placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
        
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                        onChange={this.handleChangePass}
                    />
                </Form.Item>
                <span style={{color: 'red'}}>
                    {this.state.error ? 'Invalid username or password' : ''}
                </span>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                        Log in
                    </Button>
                    Or <a href="#">register now!</a>
                </Form.Item>
            </Form>
        )
    }

}