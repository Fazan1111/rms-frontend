import React from "react";
import { Layout, Table, Breadcrumb} from "antd";
import HeaderMenu from "../layout/header";
import FormModal from "./form";


const { Content } = Layout;

export default class TestTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            data: [],
            id: 0
        }

        this.columns = [
            
        ]

        this.handleEditData = this.handleEditData.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }
    

    handleEditData = (rowId) => {
        this.setState({ id: rowId })
        this.handleOpenModal();
    }

    handleCloseModal = () => {
        this.setState({ visible: false });
    }

    handleOpenModal = () => {
        this.setState({ visible: true });
    }

    title = "Test 1";

    rendertitle() {
        return <span>{this.title}</span>
    }

    render() {


        for (let i = 1; i <= 50; i++) {
            this.state.data.push({
                key: i,
                name: `Fazan ${i}`,
                age: 25,
                gender: `Male`,
            });
        }


        return (
            <Layout className="site-layout">
                <HeaderMenu />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.rendertitle()}</Breadcrumb.Item>
                    </Breadcrumb>

                    <FormModal  />

                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Table
                            columns={this.columns}
                            dataSource={this.state.data}
                            
                            onRow={record => ({
                                onDoubleClick: () => this.handleEditData(record.key)
                            })}
                        />
                    </div>
                </Content>
                
            </Layout>
        )
    }
}