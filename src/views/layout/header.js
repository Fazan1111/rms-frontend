import React from 'react';
import {Layout} from 'antd';
import "./style.css";
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

class HeaderMenu extends React.Component {
    render() {
        return(
            <Header className="site-layout-background header" style={{ padding: 0}} >
                <div id="left-blog">
                    Rice Inventory Management
                </div>
                <div id="right-blog">
                    <UserOutlined /> Administrator
                </div>
            </Header>
        )
    }
}

export default HeaderMenu;