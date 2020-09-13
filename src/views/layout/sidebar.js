import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Layout} from 'antd';
import {PieChartOutlined, 
        CodepenOutlined, 
        UnorderedListOutlined,
        PlusCircleOutlined } from '@ant-design/icons';

const {Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends React.Component {
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return(
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div style = {{height:'40px'}} >
                    <h3 style={{marginTop: '22px', marginLeft: '15px', color: 'white'}}>Test Project</h3>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to={'/'} className="nav-link">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<PieChartOutlined />}>
                        <Link to={'/about'} className="nav-link">About</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<CodepenOutlined />} title="Product">
                        <Menu.Item key="3" icon={<UnorderedListOutlined />}><Link to={'/products'} className="nav-link">Product List</Link></Menu.Item>
                        <Menu.Item key="4" icon={<PlusCircleOutlined />}>
                            <Link to={'/products/create'}>Create Product</Link>
                        </Menu.Item>
                        <Menu.Item key="5">Unit</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar;