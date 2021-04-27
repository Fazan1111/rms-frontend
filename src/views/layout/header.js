import React from 'react';
import {Layout, Menu, Dropdown} from 'antd';
import "./style.css";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
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
                    <li onClick={this.handleGoProfile}> <UserOutlined /> Profile</li>
                </Menu.Item>
                <Menu.Item key="1">
                    <li onClick={this.handleLogout}> <LogoutOutlined /> Logout</li>
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
                        <span style={{cursor: 'pointer'}} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {this.util.getUserName()} <UserOutlined />
                        </span>
                    </Dropdown>,
                </div>
            </Header>
        )
    }
}

export default HeaderMenu;