import React from 'react';
import HeaderMenu from '../layout/header';
import {Breadcrumb, Layout, Form, Input, Button} from 'antd';
import API_BASE_URL from '../../config/config';
import {Link} from 'react-router-dom';


const {Content} = Layout;

class CreateProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            color: '',
            qty: '',
            price: '',
            image: '',
            error: false
        }
        this.handleName = this.handleName.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleQty = this.handleQty.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        //this.handleImage = this.handleImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(e) {
        this.setState({name: e.target.value})
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
        const response = await fetch(API_BASE_URL + '/products', {
            method: 'POST',
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
        const products = await response.json();

        if (products.errors) {
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

    render(){
    
        return(
            <Layout className="site-layout">
                <HeaderMenu />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Link to = {'/'}><Breadcrumb.Item>Home</Breadcrumb.Item></Link>
                        <Link to = {'/products'}><Breadcrumb.Item>Product</Breadcrumb.Item></Link>
                        <Breadcrumb.Item>Create</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <h1 style={{marginTop: '-20px', fontSize:'25px'}}>Create Product</h1>
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
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </form>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default CreateProduct;