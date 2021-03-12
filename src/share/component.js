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
    message,
    InputNumber
} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

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

        //Ant Design
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
        this.InputNumber = InputNumber;

        this.ExclamationCircleOutlined = ExclamationCircleOutlined;
        this.modalWidth = 600;
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
            onOk={() => this.setState({modalVisible: false})}
        >
            {this.state.modalContent}
        </Modal>
    }

    render() {
        return <div>
            {this.renderModal}
        </div>
    }
}