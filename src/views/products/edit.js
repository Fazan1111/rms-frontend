import React from 'react';
import HeaderMenu from '../layout/header';
import {Breadcrumb, Layout, Form, Input, Button} from 'antd';
import API_BASE_URL from '../../config/config';

const {Content} = Layout;

class EditProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            color: '',
            qty: '',
            price: '',
            loading: false
        }
        this.handleName = this.handleName.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleQty = this.handleQty.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getEditProduct();
    }

    async getEditProduct() {
        try {
            this.setState({loading: true});
            const response = await fetch(API_BASE_URL + '/products/edit/' + this.props.match.params.id);
            const product = await response.json();
            this.setState({
                id: product.id,
                name: product.name,
                color: product.color,
                qty: product.qty,
                price: product.price
            })
            //console.log(product);
        }catch (err) {
            this.setState({loading: false});
            console.error(err);
        }
    }

    handleName(e) {
        this.setState({name : e.target.value})
    }

    handleColor(e) {
        this.setState({color: e.target.value})
    }

    handleQty(e) {
        this.setState({qty: e.target.value})
    }

    handlePrice(e) {
        this.setState({price: e.target.value})
    }

    async handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(API_BASE_URL + '/products/' + this.state.id, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                "name": this.state.name,
                "color": this.state.color,
                "qty": this.state.qty,
                "price": this.state.price
            })
        })

        const updateProduct = await response.json();

        if (updateProduct.errors) {
            this.setState({
                error: true,
            });
        } else {
            this.setState({
                name: '',
                color: '',
                qty: '',
                price: '',
                error: false,
            });
        }
    }

    render() {
        return(
            <Layout className="site-layout">
                <HeaderMenu />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Product</Breadcrumb.Item>
                        <Breadcrumb.Item>Edit</Breadcrumb.Item>
                    </Breadcrumb>

                    <form onSubmit={this.handleSubmit}>
                        <Form.Item label="Name">
                            <Input placeholder="input name" value ={this.state.name} onChange = {this.handleName} />
                        </Form.Item>

                        <Form.Item label="Color">
                            <Input placeholder="input color" value ={this.state.color} onChange = {this.handleColor} />
                        </Form.Item>

                        <Form.Item label="Quantity">
                            <Input placeholder="input quantity" value ={this.state.qty} onChange = {this.handleQty} />
                        </Form.Item>

                        <Form.Item label="Price">
                            <Input placeholder="input price" value ={this.state.price} onChange = {this.handlePrice} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Update</Button>
                        </Form.Item>
                    </form>
                </Content>
            </Layout>
        )
    }
}

export default EditProduct;