import React from 'react';
import HeaderMenu from './layout/header';
import {
    Layout, 
    Breadcrumb,
    Row,
    Col,
    Card,
    Spin
} from 'antd';
import {HomeOutlined, LoadingOutlined} from "@ant-design/icons";
import '../App.css';
import BaseService from '../services/BaseService';
import Util from '../util/util';

const {Content} = Layout;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {},
            loading: false
        }
        this.util = new Util();
        this.service = new BaseService();
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        this.setState({loading: true});
        const response = await this.service.getDashboardData();
        if (response) {
            this.setState({
                data: response.data,
                loading: false
            })
            console.log('datas', this.state.data);
        }
    }

    render() {
        const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        return(
            <Layout className="site-layout">
                <HeaderMenu />
                <Content style={{ margin: '0 16px' }}>

                <Breadcrumb style={{ margin: '10px 0px 0px 0px', backgroundColor: 'white', padding: '5px' }}>
                    <Breadcrumb.Item> <HomeOutlined /> Home </Breadcrumb.Item>
                </Breadcrumb>


                    <Row style={{marginTop:'10px'}} gutter={[16, 16]}>
                        <Col span={8}>
                            <Card className="card-dash">
                                <p>Purchase Items</p>
                                <h3>
                                    {
                                        this.state.loading ? 
                                        <Spin indicator={spinIcon} />
                                        : 
                                        this.state.data.data && this.state.data.data.purchaseItems ? this.util.quantityFormat(this.state.data.data.purchaseItems.qty, 'Kg') : 0
                                    }
                                </h3>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="card-dash">
                                <p>Sale Items</p>
                                <h3>
                                    {
                                        this.state.loading ? 
                                        <Spin indicator={spinIcon} />
                                        : 
                                        this.state.data.data && this.state.data.data.saleItems ? this.util.quantityFormat(this.state.data.data.saleItems.qty, 'Kg') : 0
                                    }
                                </h3>
                            </Card>
                        </Col>

                        <Col span={8}>
                            <Card className="card-dash">
                                <p>Invoices</p>
                                <h3>
                                    {
                                        this.state.loading ? 
                                        <Spin indicator={spinIcon} />
                                        : 
                                        this.state.data.data && this.state.data.data.invoices ? this.state.data.data.invoices.qty : 0
                                    }
                                </h3>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
}

export default Home;