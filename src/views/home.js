import React from 'react';
import HeaderMenu from './layout/header';
import {
    Layout, 
    Breadcrumb,
    Row,
    Col,
    Card
} from 'antd';
import {HomeOutlined} from "@ant-design/icons";
import '../App.css';

const {Content} = Layout;

class Home extends React.Component {
    render() {
        return(
            <Layout className="site-layout">
                <HeaderMenu />
                <Content style={{ margin: '0 16px' }}>

                <Breadcrumb style={{ margin: '10px 0px 0px 0px', backgroundColor: 'white', padding: '5px' }}>
                    <Breadcrumb.Item> <HomeOutlined /> Home </Breadcrumb.Item>
                </Breadcrumb>


                    <Row style={{marginTop:'10px'}} gutter={[16, 16]}>
                        <Col span={6}>
                            <Card className="card-dash">
                                <p>Purchase</p>
                                <h3>10000kg</h3>
                            </Card>,
                        </Col>
                        <Col span={6}>
                            <Card className="card-dash">
                                <p>Sale</p>
                                <h3>9000kg</h3>
                            </Card>,
                        </Col>

                        <Col span={6}>
                            <Card className="card-dash">
                                <p>Invoice</p>
                                <h3>10</h3>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="card-dash">
                                <p>Received Payment</p>
                                <h3>800$</h3>
                            </Card>,
                        </Col>
                        <Col span={6}>
                            <Card className="card-dash">
                                <p>Amount Due</p>
                                <h3>900$</h3>
                            </Card>,
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
}

export default Home;