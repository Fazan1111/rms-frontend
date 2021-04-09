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
    InputNumber,
    DatePicker,
    Space,
    Table,
    Menu,
    Dropdown,
    Divider,
    Tag,
    Typography
} from "antd";
import {
    ExclamationCircleOutlined, 
    MinusCircleOutlined, 
    PlusOutlined,
    DownOutlined,
    DollarCircleOutlined,
    EyeOutlined
} from "@ant-design/icons";

const {Option} = Select;
const {TextArea} = Input;
const { Text } = Typography;
const { RangePicker } = DatePicker;

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
        this.DatePicker = DatePicker;
        this.Space = Space;
        this.Table = Table;
        this.Menu = Menu;
        this.Dropdown = Dropdown;
        this.Divider = Divider;
        this.Tag = Tag;
        this.Text = Text;
        this.RangePicker = RangePicker;

        //Ant Desing Icons
        this.MinusCircleOutlined= MinusCircleOutlined;
        this.PlusOutlined = PlusOutlined;
        this.DownOutlined = DownOutlined;
        this.DollarCircleOutlined = DollarCircleOutlined;
        this.EyeOutlined = EyeOutlined;

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