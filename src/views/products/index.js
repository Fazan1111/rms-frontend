import React from 'react';
import API_BASE_URL from '../../config/config';
import { Layout, Breadcrumb, Button, Modal } from 'antd';
import HeaderMenu from '../layout/header';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { confirm } = Modal;

class Products extends React.Component {

    constructor() {
        super();
        this.state = {
            products: [],
        }
    }

    componentDidMount() {
        this.getStudentCollection();
    }

    async getStudentCollection() {
        try {
            const response = await fetch(API_BASE_URL + '/product');
            const studentCollection = await response.json();
            this.setState({ products: studentCollection });
            console.log(this.state.products);
        } catch (err) {
            console.error(err);
        }
    }

    deleteProdcut(id) {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: <p>Are you sure?</p>,
            onOk() {
                fetch(API_BASE_URL + '/product/' + id, {
                    method: 'DELETE',
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }

    render() {

        return (
            <Layout className="site-layout">
                <HeaderMenu />
                <Content style={{ margin: '0 16px' }}>

                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Product</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <h1>List Product</h1>
                        <Link to={'products/create'}>
                            <Button icon={<PlusCircleOutlined />} type="primary">Add New</Button>
                        </Link>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>N&deg;</th>
                                    <th>Name</th>
                                    <th>Color</th>
                                    <th>Quanty</th>
                                    <th>Price</th>
                                    <th style={{ width: '100px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.products.map((product, i) =>
                                        <tr key={product.id} style={{ height: '28px' }}>
                                            <td> {i + 1} </td>
                                            <td> {product.pro_name} </td>
                                            <td> {product.pro_color} </td>
                                            <td> {product.qty} </td>
                                            <td> {product.price} </td>
                                            <td>
                                                <Link to={"/products/edit/" + product.id}>
                                                    <Button type="default" style={{ marginRight: '5px' }} icon={<EditOutlined />}></Button>
                                                </Link>
                                                <Button danger type="default" icon={<DeleteOutlined />} onClick={(event) => { this.deleteProdcut(event, product.id) }}>

                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Products;
