import React from "react";
import BaseService from "../../services/BaseService";
import Util from "../../util/util";
import List from "../list/list";

export default class SellItemReport extends List {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state
        }
        this.util = new Util();

        this.columns = [
            {
                title: "Sale Date",
                dataIndex: 'sell',
                key: 'sell',
                fixed: 'left',
                render: (sell) => {
                    return this.util.formatDate(sell.sellDate);
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

        this.title = "Sell Items Report";
        this.service = new BaseService();
    }

    async getSellItemsReportList() {
        this.setState({loading: true});
        const response = await this.service.sellItemReport();
        if (response) {
            this.setState({
                data: response.data,
                loading: false
            })
        }
    }

    componentDidMount() {
        this.getSellItemsReportList();
    }

    renderButtonAction() {
        return '';
    }

    handShowEditModal(any) {
        return '';
    }
}