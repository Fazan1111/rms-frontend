import React from 'react';
import API_BASE_URL from '../../config/config';
import {Layout, Breadcrumb, Table, Button, Space} from 'antd';
import HeaderMenu from '../layout/header';
import {PlusCircleOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';


const {Content} = Layout;


class Products extends React.Component {
    
    constructor() {
        super();
        this.state = {
            products : [],
            loading: null,
            filteredInfo: null,
            sortedInfo: null,
        }
    }
    
    componentDidMount() {
        this.getStudentCollection();
    }

    async getStudentCollection() {
        try {
            this.setState({loading: true});
            const response = await fetch(API_BASE_URL + '/products')
            const studentCollection = await response.json();
            this.setState({ products: studentCollection.data});
            //console.log(this.state.products);
        }catch(err) {
            this.setState({ loading: false });
            console.error(err);
        }
        
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
    };
    
    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };
    
    clearAll = () => {
        this.setState({
          filteredInfo: null,
          sortedInfo: null,
        });
    };
    
    setAgeSort = () => {
        this.setState({
          sortedInfo: {
            order: 'descend',
            columnKey: 'id',
          },
        });
    };
    

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.name.includes(value),
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
                ellipsis: true,
                filters: [
                    {text: 'Iphone x', value: 'Iphone x'}
                ]
                
            },
            {
                title: 'Color',
                dataIndex: 'color',
                key: 'color'
            },
            {
                title: 'Quantity',
                dataIndex: 'qty',
                key: 'qty',
                sorter: (a, b) => a.qty - b.qty,
                sortOrder: sortedInfo.columnKey === 'qty' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                sorter: (a, b) => a.price - b.price,
                sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: () => <div>
                                <a><Button icon={<DeleteOutlined />}></Button></a>
                                <a><Button icon={<EditOutlined />}></Button></a>
                              </div>,
                              
            }
        ];
        
        return(     
            <Layout className="site-layout">
                <HeaderMenu />
                <Content style={{ margin: '0 16px' }}>
                    
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Product</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <h1>List Product</h1>
                        <Space style={{ marginBottom: 16 }}>
                            <Button type="primary" icon={<PlusCircleOutlined />}> 
                                <Link to={'/products/create'} className="nav-link" style={{color:'white'}}>Add New</Link>
                            </Button>
                        </Space>

                        <Table columns={columns} dataSource={this.state.products} onChange={this.handleChange} />
                    </div>
                </Content>
            </Layout>       
        )
    }
}

export default Products;

/*

<table border="1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Color</th>
                                <th>Quanty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map((Products, i) => 
                                    <tr key={Products.id} style={{height:'28px'}}>
                                        <td> {Products.id} </td>
                                        <td> {Products.name} </td>
                                        <td> {Products.color} </td>
                                        <td> {Products.qty} </td>
                                        <td> {Products.price} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
*/