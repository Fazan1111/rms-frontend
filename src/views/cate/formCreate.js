import React from "react";
import CategoryService from "../../services/CategoryService";
import Component from "../../share/component";


export default class FormCreate extends Component {
    constructor(props) {
        super(props);
        this.okTextModel = 'Save';
        this.state = {
            ...this.state,
            name: '',
            code: '',
            note: '',
            newData: []
        }

        this.service = new CategoryService();
        this.handleName = this.handleName.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleNote = this.handleNote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modalWidth = 400
    }

    handleCancel() {}

    async insertCategory(category) {
        try {
            this.setState({loading: true});
            const insert = await this.service.insert(category);
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

    handleCode(e) {
        this.setState({code: e.target.value});
    }

    handleNote(e) {
        this.setState({note: e.target.value});
    }

    async handleSubmit(e) {
        let category = {
            "name": this.state.name,
            "code": this.state.code,
            "note": this.state.note
        }
        this.insertCategory(category);
        this.props.closeModal();
        this.message.success('item create success');
        
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
                    rules={[{ required: true, message: 'Please input category name!' }]}
                >
                    <this.Input onChange={this.handleName} />
                </this.Form.Item>

                <this.Form.Item 
                    name="code"
                    label="Code"
                >
                    <this.Input onChange={this.handleCode} />
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