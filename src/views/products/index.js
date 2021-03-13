import React from "react";
import List from "../list/list";
import ProductService from "../../services/ProductService";
import FormCreate from "./create";
import FormUpdate from "./edit";
import CategoryService from "../../services/CategoryService";

export default class Products extends List {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state
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
            {
                title: "Category",
                dataIndex: 'category',
                key: 'category',
                fixed: 'left',
                render: (record, i) => {
                    return record.name;
                }
            },
            {
                title: "Quantity",
                dataIndex: 'qty',
                key: 'qty',
                fixed: 'left',
                render: (qty) => new Intl.NumberFormat().format(qty) + 'Kg'
            },
            {
                title: "Cost",
                dataIndex: 'cost',
                key: 'cost',
                fixed: 'left',
                render: (cost, i) => {
                    return new Intl.NumberFormat().format(cost) + '៛';
                }
            },
            {
                title: "Price",
                dataIndex: 'price',
                key: 'price',
                fixed: 'left',
                render: (price, i) => {
                    return new Intl.NumberFormat().format(price) + '៛';
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
}