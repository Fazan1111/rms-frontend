import React from "react";
import List from "../list/list";
import ProductService from "../../services/ProductService";
import FormCreate from "./create";
import FormUpdate from "./edit";
import CategoryService from "../../services/CategoryService";
import Enum from "../enum";

export default class Products extends List {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            categories: []
        }
        this.columns = [
            {
                title: "Name",
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
                title: "Rice Code",
                dataIndex: 'sku',
                key: 'sku',
                fixed: 'left',
            },
            // {
            //     title: "Category",
            //     dataIndex: 'category',
            //     key: 'category',
            //     fixed: 'left',
            //     render: (record, i) => {
            //         return record.name;
            //     }
            // },
            {
                title: "Quantity",
                dataIndex: 'qty',
                key: 'qty',
                fixed: 'left',
                sorter: (a, b) => a.qty - b.qty,
                render: (qty) => new Intl.NumberFormat().format(qty) + 'Kg'
            },
            {
                title: "Cost",
                dataIndex: 'cost',
                key: 'cost',
                fixed: 'left',
                sorter: (a, b) => a.cost - b.cost,
                render: (cost, i) => {
                    return new Intl.NumberFormat().format(cost) + '៛/50Kg';
                }
            },
            {
                title: "Price",
                dataIndex: 'price',
                key: 'price',
                fixed: 'left',
                sorter: (a, b) => a.price - b.price,
                render: (price, i) => {
                    return new Intl.NumberFormat().format(price) + '៛/50Kg';
                }
            },
            {
                title: "Stock Status",
                dataIndex: 'qty',
                key: 'qty',
                fixed: 'left',
                render: (qty, i) => {
                    if (qty >= 500) {
                        return <span style={{color: '#1890ff'}}>In Stock</span>;
                    } else if (qty <= 500 && qty > 50) {
                        return <span style={{color: 'orange'}}>Warning</span>;
                    } else if (qty < 50) {
                        return <span style={{color: 'red'}}>Out of Stock</span>;
                    }
                }
            }
        ]
        this.service = new ProductService();
        this.categoryService = new CategoryService();
        this.title = "Product"
    }

    async handleShowAddNewForm() {
        const categoryList = await this.getCategoryList();
        if (categoryList) { 
            this.setState({
                modalVisible: true,
                modalContent: <FormCreate 
                                    closeModal={this.onCloseModal}  
                                    parentCallBack={this.handleFormCreateCallBack}
                                    categoryList={categoryList}
                                />,
            })
        }
    }

    async handShowEditModal(record) {
        const detail = await this.getDetail(record.id);
        const categories = await this.getCategoryList();
        if (detail && categories) {
            this.setState({
                modalVisible: true,
                modalContent: <FormUpdate
                                formData={detail}
                                parentCallBack={this.handleFormUpdateCallBack}
                                closeModal={this.onCloseModal}
                                categoryList={categories}
                             />
            })
        }
    }

    onCloseModal = () => {
        this.setState({modalVisible: false, loading: true});     
    }

    handleFormCreateCallBack = (newCreateData) => {
        this.setState({data: newCreateData, loading: false});
    }

    handleFormUpdateCallBack = (newUpdateData) => {
        this.setState({data: newUpdateData, loading: false});
        console.log(this.state.loading);
    }

    async getCategoryList() {
        const result = await this.categoryService.list();
        if (result) {
            this.setState({categories: result.data});
            return result.data;
        }
    }

    async getDetail(rowId) {
        try {
            this.setState({loading: true});
            const result = await this.service.detail(rowId);
            if (result) {
                this.setState({loading: false});
                return result.data;
            }
        } catch {
            this.setState({loading: false});
        }
    }

    handleStatusChange() {

    }

    renderFilterRecord() {
        return <div className="site-layout-background" style={{ margin: '10px 24px 0px 24px', backgroundColor: 'white' }}>
            <this.Row style={{padding: '15px'}}>
                <this.Col span={6} order={1}>
                    <this.Input placeholder="Search" />
                </this.Col>
                <this.Col span={6} order={2}>
                    <this.Select defaultValue="All" style={{width: '85%', marginLeft: '20px'}} onChange={this.handleSelectChange}>
                        <this.Option value={0}>All</this.Option>
                        {
                            this.state.categories.map((cate, i) =>
                                <this.Option dataIndex={i} value={cate.id}>{cate.name}</this.Option>
                            )
                        }
                    </this.Select>
                </this.Col>
                <this.Col span={6} order={3}>
                    <this.Select defaultValue="All" style={{width: '85%'}} onChange={this.handleStatusChange}>
                        <this.Option value={0}>All</this.Option>
                        <this.Option dataIndex={1} value={Enum.stockStatus.IN_STOCK}>In Stock</this.Option>
                        <this.Option dataIndex={2} value={Enum.stockStatus.WARNING}>Warning</this.Option>
                        <this.Option dataIndex={3} value={Enum.stockStatus.OUT_OF_STOCK}>Out of Stock</this.Option>
                    </this.Select>
                </this.Col>
                <this.Col span={6} order={3}>
                    <this.Button type="primary">Search</this.Button>
                </this.Col>
            </this.Row>
        </div>
    }


    componentDidMount() {
        this.getLists();
        this.getCategoryList();
    }
}