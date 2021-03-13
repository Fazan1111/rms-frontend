import React from 'react';
import ProductService from '../../services/ProductService';
import Component from "../../share/component";



export default class FormUpdate extends Component {
    constructor() {
        super()
        this.state = {
            ...this.state,
            id: 0,
            name: '',
            categoryId: 0,
            sku: '',
            qty: 0,
            cost: 0,
            price: 0,
            note: '',
            categorys: [],
            newData: []        
        }

        this.service = new ProductService();

        this.handleName = this.handleName.bind(this);
        this.handleSku = this.handleSku.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleQty = this.handleQty.bind(this);
        this.handleCost = this.handleCost.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleNote = this.handleNote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(e) {
        this.setState({name: e.target.value});
    }

    handleSku(e) {
        this.setState({sku: e.target.value});
    }

    handleQty(qty) {
        this.setState({qty: qty});
    }

    handleCategory(value) {
        this.setState({categoryId: value});
    }

    handleCost(cost) {
        this.setState({cost: cost});
    }

    handlePrice(price) {
        this.setState({price: price});
    }

    handleNote(e) {
        this.setState({note: e.target.value});
    }

    async handleSubmit() {
        let product = {
            "name": this.state.name,
            "categoryId": this.state.categoryId,
            "sku": this.state.sku,
            "qty": this.state.qty,
            "cost": this.state.cost,
            "price": this.state.price,
            "note": this.state.note
        }
        this.updateProduct(product);
        this.props.closeModal();
        this.message.success('item create success');
    }

    async updateProduct(product) {
        try {
            this.setState({loading: true});
            const insert = await this.service.update(this.state.id, product);
            if (insert) {
                const response = await this.service.list();
                if (response) {
                    this.setState({
                        newData: response.data,
                        loading: false
                    })
                    this.props.parentCallBack(this.state.newData);
                }
            }
            this.setState({loading: false});
        } catch {
            this.setState({loading: false});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.formData.id,
            name: nextProps.formData.name,
            categoryId: nextProps.formData.categoryId,
            sku: nextProps.formData.sku,
            qty: nextProps.formData.qty,
            cost: nextProps.formData.cost,
            price: nextProps.formData.price,
            note: nextProps.formData.note
        })
    }

    componentDidMount() {
        this.setState({
            categorys: this.props.categoryList,
            id: this.props.formData.id,
            name: this.props.formData.name,
            categoryId: this.props.formData.categoryId,
            sku: this.props.formData.sku,
            qty: this.props.formData.qty,
            cost: this.props.formData.cost,
            price: this.props.formData.price,
            note: this.props.formData.note
        })
    }

    render(){
    
        return(
            <this.Form 
                name="form_create" 
                layout="vertical"
                onFinish={() => this.handleSubmit()}
            >
                <this.Row gutter={[14, 14]}>
                    <this.Col span={12}>
                        <this.Form.Item 
                            label="Name"
                            placeholder="Name"
                            rules={[{ required: true, message: 'Please input product name!' }]}
                        >
                            <this.Input value={this.state.name} onChange={this.handleName} />
                        </this.Form.Item>
                        <this.Form.Item 
                            label="SKU"
                            placeholder="SKU"
                        >
                            <this.Input value={this.state.sku} onChange={this.handleSku} />
                        </this.Form.Item>
                        <this.Form.Item 
                            label="Cost"
                            placeholder="Cost"
                            rules={[{required: true, message: 'please input cost'}]}
                        >
                            <this.InputNumber value={this.state.cost} style={{width: '100%'}} onChange={this.handleCost} />
                        </this.Form.Item>
                    </this.Col>

                    <this.Col span={12}>
                        <this.Form.Item
                            label="Category"
                            rules={[{required: true, message: 'Please select category'}]}
                        >
                            <this.Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                value={this.state.categoryId}
                                onChange={this.handleCategory}
                            >
                                {this.state.categorys.map((cate, i) => 
                                    <this.Option key={i} value={cate.id}>{cate.name}</this.Option>
                                )}
                            </this.Select>
                        </this.Form.Item>
                        <this.Form.Item 
                            label="Quantity"
                            placeholder="Quantity"
                            rules={[{required: true, message: 'please input quantity'}]}
                        >
                            <this.InputNumber value={this.state.qty} onChange={this.handleQty} style={{width: '100%'}} />
                        </this.Form.Item>
                        <this.Form.Item 
                            label="Price"
                            placeholder="Price"
                            rules={[{required: true, message: 'please input price'}]}
                        >
                            <this.InputNumber value={this.state.price} onChange={this.handlePrice} style={{width: '100%'}} />
                        </this.Form.Item>
                    </this.Col>

                    <this.Col span={24}>
                        <this.Form.Item
                            label=" Description"
                            placeholder="Description"
                        >
                            <this.TextArea value={this.state.note} onChange={this.handleNote} />
                        </this.Form.Item>         
                    </this.Col>
                </this.Row>
                
                <this.Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Update
                </this.Button>
            </this.Form>
        )
    }
}
