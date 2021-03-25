import React from "react";
import Component from "../../../share/component";
import EmployeeService from "../../../services/EmployeeService";
import SupplierService from "../../../services/SupplierService";
import ProductService from "../../../services/ProductService";
import PurchaseService from "../../../services/PurchaseService";
import "../style.css"
import Util from "../../../util/util";

export default class FormCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            employeeId: 0,
            supplierId: 0,
            purchaseDate: '',
            employees: [],
            suppliers: [],
            products: [],
            newData: []
        }
        
        this.service = new PurchaseService();
        this.employeeService = new EmployeeService();
        this.supplierService = new SupplierService();
        this.productService  = new ProductService();
        this.util = new Util();
    }

    async getEmployeeList() {
        try {
            const response = await this.employeeService.list();
            if (response) {
                this.setState({employees: response.data});
            }
        } catch {
            
        }
    }

    async getSupplierList() {
        try {
            const response = await this.supplierService.list();
            if (response) {
                this.setState({suppliers: response.data});
            }
        } catch(err) {
            throw err;
        }
        
    }

    async getProductList() {
        const response = await this.productService.list();
        if (response) {
            this.setState({products: response.data});
        }
    }


    handleEmployee = (empId) => {
        this.setState({employeeId: empId});
    }

    handleSupplier = (supId) => {
        this.setState({supplierId: supId});
    }

    onChangePurchDate = (date, dateString) => {
        this.setState({purchaseDate: dateString});
    }

    onChangeQty(row, qty) {
        let price = document.getElementById(`price-row-${row.key}`).value;
        document.getElementById(`amount-row-${row.key}`).value = price * (qty / 50);
    }

    onChangePrice(row, price) {
        let qty = document.getElementById(`qty-row-${row.key}`).value;
        document.getElementById(`amount-row-${row.key}`).value = price * (qty / 50);
    }

    onFinish(values) {
        let totalAmount = 0;
        let purchItems = [];
        values["purchaseItems"].forEach(value => {
            let item = {
                "productId": value.productId,
                "qty": value.qty,
                "price": value.price,
                "amount": value.price * (value.qty / 50)
            }
            purchItems.push(item);
            totalAmount += value.price * (value.qty / 50);
        })

        const data = {
            "employeeId": this.state.employeeId,
            "supplierId": this.state.supplierId,
            "purchaseDate": this.util.dateFormatForMySql(this.state.purchaseDate),
            "total": totalAmount,
            "purchaseItems": purchItems
        }

        this.createPurchase(data);
        this.props.closeModal();
        this.message.success('Make purcashe order success');
    }

    async createPurchase(data) {
        try {
            this.setState({loading: true});
            const insert = await this.service.insert(data);
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
        this.getEmployeeList();
        this.getSupplierList();
        this.getProductList();
    }

    render() {
        return (
            <this.Form
                name="normal_login"
                className="purchase_form"
                initialValues={{
                    remember: true,
                }}
                layout="vertical"
                onFinish={(values) => this.onFinish(values)}
            >
                <this.Row gutter={[8, 8, 8]}>
                    <this.Col span={8}>
                        <this.Form.Item label="Employee">
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
                                style={{with:'100%'}}
                                onChange={this.handleEmployee}
                            >
                                {this.state.employees.map((emp) =>
                                    <this.Option value={emp.id}>{emp.fname}</this.Option>
                                )}
                            </this.Select>
                        </this.Form.Item>
                    </this.Col>
                    <this.Col span={8}>
                        <this.Form.Item label="Supplier">
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
                                style={{with:'100%'}}
                                onChange={this.handleSupplier}
                            >
                                {this.state.suppliers.map((sup) =>
                                    <this.Option value={sup.id}>{sup.name}</this.Option>
                                )}
                            </this.Select>
                        </this.Form.Item>
                    </this.Col>
                    <this.Col span={8}>
                        <this.Form.Item name="purchaseDate" label="Purchase Date">
                            <this.DatePicker style={{width:'100%'}} onChange={this.onChangePurchDate} />
                        </this.Form.Item>
                    </this.Col>
                </this.Row>
                <this.Row>
                    <this.Col span={24}>
                        <p>Add product items</p>
                        <this.Form.List name="purchaseItems" id="purchaseItems">
                            {(fields, { add, remove }) => (
                                <div>
                                    {fields.map(field => (
                                        <this.Space key={field.key} align="baseline">
                                            <this.Form.Item
                                                noStyle
                                                shouldUpdate={(prevValues, curValues) =>
                                                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                                }
                                            >
                                            
                                            {() => (
                                                <this.Form.Item
                                                    {...field}
                                                    label={field.key !== 0 ? '' : 'Product'}
                                                    name={[field.name, 'productId']}
                                                    fieldKey={[field.fieldKey, 'sight']}
                                                    rules={[{ required: true, message: 'Missing sight' }]}
                                                >
                                                    <this.Select 
                                                        style={{ width: '180px' }}
                                                        showSearch
                                                        placeholder="Choose product"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                        filterSort={(optionA, optionB) =>
                                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                        }
                                                        onChange={this.onChangProduct}
                                                        >
                                                        {this.state.products.map(item => (
                                                        <this.Option row={field.key} key={item.id} value={item.id} price={item.price}>
                                                            {item.name}
                                                        </this.Option>
                                                        ))}
                                                    </this.Select>
                                                </this.Form.Item>
                                            )}
                                            </this.Form.Item>

                                            <this.Form.Item
                                                {...field}
                                                label={field.key !== 0 ? '' : 'Quantity'}
                                                name={[field.name, 'qty']}
                                                fieldKey={[field.fieldKey, 'qty']}
                                                style={{width: '180px'}}
                                                
                                                rules={[{ required: true, message: 'Missing quantity' }]}
                                            >
                                                <this.InputNumber type="number" key={field.key} id={`qty-row-${field.key}`} style={{width:'100%'}} onChange={(value) =>this.onChangeQty(field, value)} />
                                            </this.Form.Item>

                                            <this.Form.Item
                                                {...field}
                                                value={0}
                                                label={field.key !== 0 ? '' : 'Price/50Kg'}
                                                name={[field.name, 'price']}
                                                fieldKey={[field.fieldKey, 'price']}
                                                style={{width: '180px'}}
                                                rules={[{ required: true, message: 'Missing price' }]}
                                            >
                                                <this.InputNumber id={`price-row-${field.key}`} style={{width: '100%'}} onChange={(value) => this.onChangePrice(field, value)} />
                                            </this.Form.Item>

                                            <this.Form.Item
                                                {...field}
                                                label={field.key !== 0 ? '' : 'Amount'}
                                                name={[field.name, 'amount']}
                                                fieldKey={[field.fieldKey, 'amount']}
                                                style={{width: '180px'}}
                                            >
                                                <this.InputNumber value={100} className='amount' id={`amount-row-${field.key}`} style={{width:'100%', background: 'white', color: 'black'}} disabled />
                                            </this.Form.Item>

                                            <this.MinusCircleOutlined onClick={() => remove(field.name)} />
                                       </this.Space>
                                    ))}

                                    <this.Form.Item>
                                        <this.Button type="dashed" onClick={() => add()} block icon={<this.PlusOutlined />}>
                                            Add Product Item
                                        </this.Button>
                                    </this.Form.Item>
                                </div>
                            )}
                        </this.Form.List>
                    </this.Col>
                </this.Row>

                <this.Button htmlType="submit" type="primary" >
                    Save
                </this.Button>
            </this.Form>
        )
    }
}