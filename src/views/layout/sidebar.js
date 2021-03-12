import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Layout} from 'antd';
import {PieChartOutlined, 
        CodepenOutlined, 
        UnorderedListOutlined
} from '@ant-design/icons';

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
                    <h2 style={{marginTop: '22px', marginLeft: '15px', color: 'white'}}>RMS</h2>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to={'/'} className="nav-link">Dashboard</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<CodepenOutlined />} title="User Management">
                        <Menu.Item key="2" icon={<UnorderedListOutlined />}><Link to={'/user'} className="nav-link">User</Link></Menu.Item>
                        <Menu.Item key="3" icon={<UnorderedListOutlined />}>Role</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<CodepenOutlined />} title="Contact">
                        <Menu.Item key="4" icon={<UnorderedListOutlined />}><Link to={'/supplier'} className="nav-link">Supplier</Link></Menu.Item>
                        <Menu.Item key="5" icon={<UnorderedListOutlined />}><Link to={'/customer'} className="nav-link">Customer</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<CodepenOutlined />} title="Product">
                        <Menu.Item key="6" icon={<UnorderedListOutlined />}><Link to={'/category'} className="nav-link">Category</Link></Menu.Item>
                        <Menu.Item key="7" icon={<UnorderedListOutlined />}><Link to={'/products'} className="nav-link">Product</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<CodepenOutlined />} title="Transaction">
                        <Menu.Item key="8" icon={<UnorderedListOutlined />}><Link to={'/supplier'} className="nav-link">Purchase</Link></Menu.Item>
                        <Menu.Item key="9" icon={<UnorderedListOutlined />}><Link to={'/customer'} className="nav-link">Sell</Link></Menu.Item>
                        <Menu.Item key="10" icon={<UnorderedListOutlined />}><Link to={'/customer'} className="nav-link">Payment</Link></Menu.Item>
                        <Menu.Item key="11" icon={<UnorderedListOutlined />}><Link to={'/customer'} className="nav-link">Exspense</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" icon={<CodepenOutlined />} title="Report">
                        <Menu.Item key="12" icon={<UnorderedListOutlined />}><Link to={'/supplier'} className="nav-link">Purchase</Link></Menu.Item>
                        <Menu.Item key="13" icon={<UnorderedListOutlined />}><Link to={'/customer'} className="nav-link">Sell</Link></Menu.Item>
                        <Menu.Item key="14" icon={<UnorderedListOutlined />}><Link to={'/customer'} className="nav-link">Payment</Link></Menu.Item>
                        <Menu.Item key="15" icon={<UnorderedListOutlined />}><Link to={'/customer'} className="nav-link">Exspense</Link></Menu.Item>
                        <Menu.Item key="16" icon={<UnorderedListOutlined />}><Link to={'/customer'} className="nav-link">Income</Link></Menu.Item>
                        <Menu.Item key="17" icon={<UnorderedListOutlined />}><Link to={'/customer'} className="nav-link">Aging</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar;