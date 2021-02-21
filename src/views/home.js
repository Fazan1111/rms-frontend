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


                    <Row style={{marginTop:'10px'}}>
                        <Col span={6}>
                            <Card className="card-dash">
                                <p>Total Stock In</p>
                                <h3>1500kg</h3>
                            </Card>,
                        </Col>
                        <Col span={6}>
                            <Card className="card-dash">
                                <p>Total Stock Out</p>
                                <h3>900kg</h3>
                            </Card>,
                        </Col>
                        <Col span={6}>
                            <Card className="card-dash">
                                <p>Received Payment</p>
                                <h3>800$</h3>
                            </Card>,
                        </Col>
                        <Col span={6}>
                            <Card className="card-dash">
                                <p>Total Aging</p>
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