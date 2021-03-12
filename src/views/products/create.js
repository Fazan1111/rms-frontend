import React from 'react';
import ProductService from '../../services/ProductService';
import Component from "../../share/component";



export default class FormCreate extends Component {
    constructor() {
        super()
        this.state = {
            ...this.state,
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
        await this.createProduct(product);
        this.props.closeModal();
        this.message.success('item create success');
    }

    async createProduct(product) {
        try {
            this.setState({loading: true});
            const insert = await this.service.insert(product);
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

    componentDidMount() {
        this.setState({categorys: this.props.categoryList})
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
                            name="name"
                            label="Name"
                            placeholder="Name"
                            rules={[{ required: true, message: 'Please input product name!' }]}
                        >
                            <this.Input onChange={this.handleName} />
                        </this.Form.Item>
                        <this.Form.Item 
                            name="sku"
                            label="SKU"
                            placeholder="SKU"
                        >
                            <this.Input onChange={this.handleSku} />
                        </this.Form.Item>
                        <this.Form.Item 
                            name="cost"
                            label="Cost"
                            placeholder="Cost"
                            rules={[{required: true, message: 'please input cost'}]}
                        >
                            <this.InputNumber style={{width: '100%'}} onChange={this.handleCost} />
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
                                onChange={this.handleCategory}
                            >
                                {this.state.categorys.map((cate, i) => 
                                    <this.Option value={cate.id}>{cate.name}</this.Option>
                                )}
                            </this.Select>
                        </this.Form.Item>
                        <this.Form.Item 
                            name="qty"
                            label="Quantity"
                            placeholder="Quantity"
                            rules={[{required: true, message: 'please input quantity'}]}
                        >
                            <this.InputNumber onChange={this.handleQty} style={{width: '100%'}} />
                        </this.Form.Item>
                        <this.Form.Item 
                            label="Price"
                            placeholder="Price"
                            rules={[{required: true, message: 'please input price'}]}
                        >
                            <this.InputNumber onChange={this.handlePrice} style={{width: '100%'}} />
                        </this.Form.Item>
                    </this.Col>

                    <this.Col span={24}>
                        <this.Form.Item
                            label=" Description"
                            placeholder="Description"
                        >
                            <this.TextArea onChange={this.handleNote} />
                        </this.Form.Item>         
                    </this.Col>
                </this.Row>
                
                <this.Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Save
                </this.Button>
            </this.Form>
        )
    }
}
