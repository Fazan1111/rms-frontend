import React from 'react';
import HeaderMenu from './layout/header';
import {Layout, Breadcrumb} from 'antd';

const {Content} = Layout;

class Home extends React.Component {
    render() {
        return(
            <Layout className="site-layout">
                <HeaderMenu />
                <Content style={{ margin: '0 16px' }}>

                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>

                    <h1>Welcom to Home page</h1>
                </Content>
            </Layout>
        )
    }
}

export default Home;