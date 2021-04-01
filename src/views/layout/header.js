import React from 'react';
import {Layout, Menu, Dropdown} from 'antd';
import "./style.css";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import App from '../../App';
import Util from '../../util/util';

const { Header } = Layout;

class HeaderMenu extends React.Component {

    util = new Util();

    handleGoProfile() {}

    handleLogout() {
        localStorage.clear();
        window.location.reload();
    }

    render() {

        const menu = (
            <Menu style={{width: '200px'}}>
                <Menu.Item key="0">
                    <a onClick={this.handleGoProfile}> <UserOutlined /> Profile</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a onClick={this.handleLogout}> <LogoutOutlined /> Logout</a>
                </Menu.Item>
            </Menu>
        )

        return(
            <Header className="site-layout-background header" style={{ padding: 0}} >
                <div id="left-blog">
                    Rice Inventory Management
                </div>
                <div id="right-blog">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {this.util.getUserName()} <UserOutlined />
                        </a>
                    </Dropdown>,
                </div>
            </Header>
        )
    }
}

export default HeaderMenu;