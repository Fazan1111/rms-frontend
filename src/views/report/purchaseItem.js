import React from "react";
import BaseService from "../../services/BaseService";
import Util from "../../util/util";
import List from "../list/list";

export default class PurchaseReport extends List {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state
        }
        this.util = new Util();

        this.columns = [
            {
                title: "Purchase Date",
                dataIndex: 'purchase',
                key: 'purchase',
                fixed: 'left',
                render: (purchase) => {
                    return this.util.formatDate(purchase.purchaseDate);
                }
            },
            {
                title: "Product Item",
                dataIndex: 'product',
                key: 'product',
                fixed: 'left',
                render: (product) => product.name
            },
            {
                title: "Product Code",
                dataIndex: 'product',
                key: 'product',
                fixed: 'left',
                render: (product) => product.sku
            },
            {
                title: "Quantity",
                dataIndex: 'qty',
                key: 'qty',
                fixed: 'left',
                sorter: (a, b) => a.qty - b.qty
            }
        ]

        this.title = "Purchase Item Report";
        this.service = new BaseService();
    }

    async getPurchaseReportList() {
        this.setState({loading: true});
        const response = await this.service.purchaseItemReport();
        if (response) {
            this.setState({
                data: response.data,
                loading: false
            })
        }
    }

    componentDidMount() {
        this.getPurchaseReportList();
    }

    renderButtonAction() {
        return '';
    }

    handShowEditModal(any) {
        return '';
    }
}