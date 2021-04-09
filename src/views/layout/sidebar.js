import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Layout} from 'antd';
import {PieChartOutlined, 
        CodepenOutlined, 
        UnorderedListOutlined,
        BarChartOutlined,
        UsergroupAddOutlined,
        UserOutlined,
        SolutionOutlined,
        SwapOutlined,
        SwapLeftOutlined,
        SwapRightOutlined,
        DollarCircleOutlined
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
                    <SubMenu key="sub1" icon={<UsergroupAddOutlined />} title="User Management">
                        <Menu.Item key="2" icon={<UserOutlined />}><Link to={'/user'} className="nav-link">User</Link></Menu.Item>
                        <Menu.Item key="3" icon={<UnorderedListOutlined />}>User Activity</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<SolutionOutlined />} title="Contact">
                        <Menu.Item key="4" icon={<SolutionOutlined />}><Link to={'/employee'} className="nav-link">Employee</Link></Menu.Item>
                        <Menu.Item key="5" icon={<SolutionOutlined />}><Link to={'/supplier'} className="nav-link">Supplier</Link></Menu.Item>
                        <Menu.Item key="6" icon={<SolutionOutlined />}><Link to={'/customer'} className="nav-link">Customer</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<CodepenOutlined />} title="Product">
                        <Menu.Item key="7" icon={<CodepenOutlined />}><Link to={'/category'} className="nav-link">Category</Link></Menu.Item>
                        <Menu.Item key="8" icon={<CodepenOutlined />}><Link to={'/products'} className="nav-link">Product</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<SwapOutlined />} title="Transaction">
                        <Menu.Item key="9" icon={<SwapLeftOutlined />}><Link to={'/purchase'} className="nav-link">Purchase</Link></Menu.Item>
                        <Menu.Item key="10" icon={<SwapRightOutlined />}><Link to={'/sale'} className="nav-link">Sale</Link></Menu.Item>
                        <Menu.Item key="11" icon={<DollarCircleOutlined />}><Link to={'/payment'} className="nav-link">Invoice Payment</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" icon={<BarChartOutlined />} title="Report">
                        <Menu.Item key="12" icon={<UnorderedListOutlined />}><Link to={'/report/purchase'} className="nav-link">Purchase</Link></Menu.Item>
                        <Menu.Item key="13" icon={<UnorderedListOutlined />}><Link to={'/report/sale'} className="nav-link">Invoice</Link></Menu.Item>
                        <Menu.Item key="14" icon={<UnorderedListOutlined />}><Link to={'/report/purchase-items'} className="nav-link">Purchase Items</Link></Menu.Item>
                        <Menu.Item key="15" icon={<UnorderedListOutlined />}><Link to={'/report/sell-items'} className="nav-link">Sale Items</Link></Menu.Item>
                        <Menu.Item key="16" icon={<UnorderedListOutlined />}><Link to={'/report/stock'} className="nav-link">Stock</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar;