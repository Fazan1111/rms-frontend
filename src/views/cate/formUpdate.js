import React from "react";
import CategoryService from "../../services/CategoryService";
import Component from "../../share/component";


export default class FormUpdate extends Component {
    constructor(props) {
        super(props);
        this.okTextModel = 'Save';
        this.state = {
            ...this.state,
            id: 0,
            name: '',
            code: '',
            note: '',
            newData: [],
        }

        this.service = new CategoryService();
        this.handleName = this.handleName.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleNote = this.handleNote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modalWidth = 400
    }

    handleCancel() {}

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
        
        this.upateCategory(this.state.id, category);
        this.props.closeModal();
        this.message.success('item update success');
        
    }

    async upateCategory(id, category) {
        try {
            this.setState({loading: true});
            const update = await this.service.update(id, category);
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

    componentWillReceiveProps(nextProps) {
        console.log('new');
        this.setState({
            id: nextProps.formData.id,
            name: nextProps.formData.name,
            code: nextProps.formData.code,
            note: nextProps.formData.note
        })
    }

    componentDidMount() {
        console.log('props');
        this.setState({
            id: this.props.formData.id,
            name: this.props.formData.name,
            code: this.props.formData.code,
            note: this.props.formData.note
        })
    }

    render() {
        console.log(this.state.name);
        return (
            <this.Form 
                name="form_create" 
                layout="vertical"
                onFinish={() => this.handleSubmit()}
            >
                <this.Form.Item 
                    label="Name"
                    rules={[{ required: true, message: 'Please input category name!' }]}
                >
                    <this.Input value={this.state.name} onChange={this.handleName} />
                </this.Form.Item>

                <this.Form.Item 
                    label="Code"
                >
                    <this.Input value={this.state.code} onChange={this.handleCode} />
                </this.Form.Item>

                <this.Form.Item
                    label="Note"
                >
                    <this.TextArea maxLength={100} value={this.state.note} onChange={this.handleNote} />
                </this.Form.Item>

                <this.Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Save
                </this.Button>
            </this.Form>
        )
    }
}