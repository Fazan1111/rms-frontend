import React from "react";
import {Form, Input} from "antd";


export default class FormItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form name="formUser" >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        )
    }
}