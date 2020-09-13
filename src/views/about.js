import React from 'react';
import {Layout, Breadcrumb} from 'antd';
import HeaderMenu from './layout/header';

const {Content} = Layout;

class About extends React.Component {
    render() {
        return(
            <Layout className="site-layout">
                <HeaderMenu />
                <Content style={{ margin: '0 16px' }}>

                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>

                    <h1>Welcom to About page</h1>
                </Content>
            </Layout>
        )
    }
}

export default About;