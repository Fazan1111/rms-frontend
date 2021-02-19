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
    Modal
} from "antd";
import HeaderMenu from "../layout/header";
import BaseService from "../../services/BaseService";
import "./style.css";

const {Option} = Select;
const { Content } = Layout;

export default class List extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visiblePopup: false,
            data: [],
            selectedRowKeys: [],
            loading: false
        }
        this.columns = []
    }

    service = new BaseService();
    
    title = "Test 1";
    modalWidth = 800;

    componentDidMount() {
        this.getLists();
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

    rendertitle() {
        return <span>{this.title}</span>
    }

    renderBreadCrumb() {
        return <Breadcrumb style={{marginTop: '15px'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{this.rendertitle()}</Breadcrumb.Item>
        </Breadcrumb>
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    handleShowAddNewForm() {}

    renderButtonAction() {
        return (
        <div>
            <Button type="primary" onClick={this.handleShowAddNewForm}>
                Add New
            </Button>
            <Button type="danger">
                Delete
            </Button>
        </div>
        )
    }

    handleSubmit() {}
    handleCancel() {
        this.setState({visiblePopup: false});
    }

    handShowEditModal(rowId) {
        console.log(rowId);
        this.setState({visiblePopup: true});
    }

    handleModal() {
        return <Modal
            style={{top: 20}}
            title={this.title}
            visible={this.state.visiblePopup}
            onOk={() => this.handleSubmit()}
            onCancel={() => this.handleCancel()}
            width={this.modalWidth}
      >
      </Modal>
    }

    handleSelectChange() {}

    renderFilterRecord() {
        return <div className="site-layout-background" style={{ margin: 24, backgroundColor: 'white' }}>
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

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <Layout className="site-layout">
                <HeaderMenu />
                <Content>
                    {this.renderBreadCrumb()}
                    {this.renderFilterRecord()}
                    {this.handleModal()}
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {this.renderButtonAction()}
                        <Table
                            columns={this.columns}
                            dataSource={this.state.data}
                            onRow={record => ({
                                onDoubleClick: () => this.handShowEditModal(record.id)
                            })}
                            rowSelection={rowSelection}
                            loading={this.state.loading}
                            rowKey={record => record.id}
                        />
                    </div>
                </Content>
                
            </Layout>
        )
    }
}