import React from "react";
import { 
    Layout, 
    Table, 
    Breadcrumb, 
    Button, 
    Row, 
    Col, 
    Input,
    Select,
    Modal,
    Space
} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import HeaderMenu from "../layout/header";
import BaseService from "../../services/BaseService";
import "./style.css";
import Component from "../../share/component";

const {Option} = Select;
const { Content } = Layout;

export default class List extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            data: [],
            selectedRowKeys: [],
        }
        this.columns = []
    }

    service = new BaseService();
    
    title = "Test 1";
    modalWidth = 800;

    componentDidMount() {
        this.getLists();
    }

    componentWillReceiveProps() {
    }

    async getLists() {
        this.setState({loading: true});
        try {
            const response = await this.service.list();
            this.setState({
                data: response.data,
                loading: false
            })
        }catch(err) {
            console.log(err);
            this.setState({loading: false});
        }
    
    }

    async delete() {
        this.setState({loading: true});
        try {
            const keys = {
                "ids": this.state.selectedRowKeys
            }
            await this.service.delete(keys);
            this.getLists();
            this.setState({loading: false});
            
        } catch {
            this.getLists();
            this.setState({loading: false});
        }
        
    }

    confirmDelete() {
        this.delete();
    }

    deleteData() {
        Modal.confirm({
            title: 'Are you sure to delete this ?',
            icon: <this.ExclamationCircleOutlined />,
            okText: 'Yes',
            onOk: () => this.confirmDelete(),
            cancelText: 'Cancel',
        })
    }

    handleCancel() {
        this.setState({loading: true, modalVisible: false});
        this.getLists();
        //window.location.reload();
        this.setState({loading: false});
    }

    rendertitle() {
        return <span>{this.title}</span>
    }

    renderBreadCrumb() {
        return <Breadcrumb style={{ margin: '10px 24px 0px 24px', backgroundColor: 'white', padding: '5px' }}>
            <Breadcrumb.Item> <HomeOutlined /> Home </Breadcrumb.Item>
            <Breadcrumb.Item>{this.rendertitle()}</Breadcrumb.Item>
        </Breadcrumb>
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    handleShowAddNewForm(e) {
        this.setState({modalVisible: true});
    }

    renderButtonAction() {
        return (
        <Space size="small" style={{marginBottom: '15px'}}>
            <Button type="primary" onClick={() => this.handleShowAddNewForm()}>
                Add New
            </Button>
            <Button type="danger" onClick={() => this.deleteData()}>
                Delete
            </Button>
        </Space>
        )
    }

    handShowEditModal(rowId) {
        console.log(rowId);
        this.setState({modalVisible: true});
    }

    handleSelectChange() {}

    renderFilterRecord() {
        return <div className="site-layout-background" style={{ margin: '10px 24px 0px 24px', backgroundColor: 'white' }}>
            <Row style={{padding: '15px'}}>
                <Col span={6} order={1}>
                    <Input placeholder="Search" />
                </Col>
                <Col span={6} order={2}>
                    <Select defaultValue="All" style={{width: '85%', marginLeft: '20px'}} onChange={this.handleSelectChange}>
                        <Option value="2">All</Option>
                        <Option value="1">Active</Option>
                        <Option value="0">Disactive</Option>
                    </Select>
                </Col>
                <Col span={6} order={3}>
                    <Button type="primary">Search</Button>
                </Col>
            </Row>
        </div>
    }

    renderTable() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <Table
                columns={this.columns}
                dataSource={this.state.data}
                onRow={record => ({
                    onDoubleClick: () => this.handShowEditModal(record)
                })}
                rowSelection={rowSelection}
                loading={this.state.loading}
                rowKey={record => record.id}
                size="middle"
            />
        )
    }

    render() {
        return (
            <Layout className="site-layout">
                <HeaderMenu />
                <Content>
                    {this.renderBreadCrumb()}
                    {this.renderFilterRecord()}
                    {this.renderModal()}
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {this.renderButtonAction()}
                        {this.renderTable()}
                    </div>
                </Content>
                
            </Layout>
        )
    }
}