import React from "react";
import BaseService from "../../services/BaseService";
import ProductService from "../../services/ProductService";
import Util from "../../util/util";
import List from "../list/list";
import moment from "moment";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import PrintSaleItemReport from "./prints/printSaleItem";
import { CSVLink } from "react-csv";

export default class SellItemReport extends List {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            products: []
        }
        this.util = new Util();

        this.columns = [
            {
                title: "Product Item",
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
            },
            {
                title: "Product Code",
                dataIndex: 'sku',
                key: 'sku',
                fixed: 'left',
            },
            {
                title: "Quantity",
                dataIndex: 'qty',
                key: 'qty',
                fixed: 'left',
                sorter: (a, b) => a.qty - b.qty,
                render: (qty)  => this.util.quantityFormat(qty, 'Kg')
            }
        ]

        this.title = "Sell Items Report";
        this.service = new BaseService();
        this.productService = new ProductService();

        this.excelHeaders = [
            {label: "Product Item", key: "name"},
            {label: "Product Code", key: "sku"},
            {label: "Quantity", key: "qty"}
        ]
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
        this.getProductList();
    }

    renderButtonAction() {
        return (
            <this.Space size="small" style={{marginBottom: '15px'}}>
                <div>
                    <div style={{display: 'none'}}>
                        <PrintSaleItemReport data={this.state.data} ref={el => (this.componentRef = el)} />
                    </div>
                    <ReactToPrint content={() => this.componentRef}>
                        <PrintContextConsumer>
                            {({ handlePrint }) => (
                                <this.Button onClick={handlePrint} type="primary" >
                                    Print Report
                                </this.Button>
                            )}
                        </PrintContextConsumer>
                    </ReactToPrint>
                </div>
                <div>
                    <CSVLink 
                        data={this.state.data} 
                        headers={this.excelHeaders}
                        filename={"saleItemReport.csv"}
                    >
                        <this.Button type="primary" style={{background: 'green', color: 'white'}}>
                            Export to Excel
                        </this.Button>
                    </CSVLink>
                </div>
            </this.Space>
        );
    }

    handShowEditModal(any) {
        return '';
    }

    async getProductList() {
        const response = await this.productService.list();
        if (response) {
            this.setState({products: response.data});
        }
    }

    renderFilterRecord() {
        return <div className="site-layout-background" style={{ margin: '18px 24px 0px 24px', backgroundColor: 'white' }}>
            <this.Row style={{padding: '15px'}} gutter={[16, 16]}>
                <this.Col span={6} order={2}>
                    <this.Select style={{ width: '100%' }}
                        showSearch
                        placeholder="Select product"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={(value, qty) => this.onChangProduct(value, qty)}
                    >
                        {
                            this.state.products.map((item, i) => 
                                <this.Option key={i} value={item.id}>{item.name}</this.Option>
                            )
                        }
                    </this.Select>
                </this.Col>
                <this.Col span={6} order={1}>
                <this.RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                />
                </this.Col>
                <this.Col span={6} order={3}>
                    <this.Button type="primary">Search</this.Button>
                </this.Col>
            </this.Row>
        </div>
    }

    renderTable() {
        return (
         <this.Table
         columns={this.columns}
         dataSource={this.state.data}
         pagination={false}
         bordered
         size="small"
         summary={pageData => {
           let totalSaleItem = 0;
     
           pageData.forEach(({ qty }) => {
             totalSaleItem += parseFloat(qty);
           });
     
           return (
             <>
               <this.Table.Summary.Row>
                 <this.Table.Summary.Cell colSpan={2}>Total</this.Table.Summary.Cell>
                 <this.Table.Summary.Cell>
                   <this.Text style={{textAlign: 'left'}}>{this.util.quantityFormat(totalSaleItem, 'Kg')}</this.Text>
                 </this.Table.Summary.Cell>
               </this.Table.Summary.Row>
             </>
           );
         }}
       />
        )
    }
}