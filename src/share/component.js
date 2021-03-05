import React from "react";
import {
    Modal,
    Button,
    Input,
    Breadcrumb,
    Form,
    Row,
    Col,
    Select,
    message
} from "antd";

const {Option} = Select;
const {TextArea} = Input;

export default class Component extends React.Component {
    constructor() {
        super()
        this.state = {
            modalVisible: false,
            modalContent: '',
            loading: false
        }
        this.Modal = Modal;
        this.Button = Button;
        this.Input = Input;
        this.Breadcrumb = Breadcrumb;
        this.Form = Form;
        this.Row = Row;
        this.Col = Col;
        this.Select = Select;
        this.Option = Option;
        this.TextArea = TextArea;
        this.okTextModel = '';
        this.message = message;
    }

    handleCancel() {
        this.setState({modalVisible: false});
    }

    renderModal() {
        return <Modal
            style={{top: 20}}
            title={this.title}
            visible={this.state.modalVisible}
            okText={this.okTextModel}
            onCancel={() => this.handleCancel()}
            width={this.modalWidth}
            footer={null}
        >
            {this.state.modalContent}
        </Modal>
    }

    render() {
        return this.renderModal;
    }
}