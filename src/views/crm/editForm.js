import React from "react";
import Component from "../../share/component";


export default class FormEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            name: ''
        }
        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        alert(this.state.name);
    }

    handleName(e) {
        this.setState({name: e.target.value});
    }

    componentDidMount() {

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
                    <this.Input defaultValue={this.props.formData.name} onChange={this.handleName} />
                </this.Form.Item>

                <this.Form.Item 
                    name="phone"
                    label="Phone Number"
                >
                    <this.Input defaultValue={this.props.formData.contact} />
                </this.Form.Item>

                <this.Form.Item 
                    name="email"
                    label="Email"
                >
                    <this.Input defaultValue={this.props.formData.email} />
                </this.Form.Item>

                <this.Form.Item 
                    name="address"
                    label="Address"
                >
                    <this.Input defaultValue={this.props.formData.address} />
                </this.Form.Item>

                <this.Form.Item
                    name="note"
                    label="Note"
                >
                    <this.TextArea maxLength={100} defaultValue={this.props.note} />
                </this.Form.Item>

                <this.Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Save
                </this.Button>
            </this.Form>
        )
    }
}