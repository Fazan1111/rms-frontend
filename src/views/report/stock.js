import React from "react";
import BaseService from "../../services/BaseService";
import ProductService from "../../services/ProductService";
import Util from "../../util/util";
import List from "../list/list";
import moment from "moment";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { CSVLink } from "react-csv";
import PrintStockReport from "./prints/printStock";


export default class StockReport extends List {
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
            },
            {
                title: "Stock Status",
                dataIndex: 'qty',
                key: 'qty',
                fixed: 'left',
                render: (qty) => {
                    if (qty >= 500) {
                        return <this.Tag style={{color: '#1890ff'}}>In Stock</this.Tag >;
                    } else if (qty <= 500 && qty > 50) {
                        return <this.Tag  style={{color: 'orange'}}>Warning</this.Tag >;
                    } else if (qty < 50) {
                        return <this.Tag  style={{color: 'red'}}>Out of Stock</this.Tag >;
                    }
                }
            }
        ]

        this.title = "Stock Report";
        this.service = new BaseService();
        this.productService = new ProductService();

        this.excelHeaders = [
            {label: "Product Item", key: "name"},
            {label: "Product Code", key: "sku"},
            {label: "Quantity", key: "qty"},
            {label: "Stock Status", key: 'status'}
        ]
    }

    componentDidMount() {
        this.getStockReportList();
        this.getProductList();
        console.log('product', this.state.products);
    }


    async getStockReportList() {
        this.setState({loading: true});
        const response = await this.service.stockReport();
        if (response) {
            this.setState({
                data: response.data,
                loading: false
            })
        }
    }

    async getProductList() {
        const response = await this.productService.list();
        if (response) {
            this.setState({products: response.data});
        }
    }

    renderButtonAction() {
        return '';
    }

    handShowEditModal(any) {
        return '';
    }

    async onSubmitFilter(value) {
        let startDate = ''
        let endDate = ''

        if (value['dateRange']) {
            const rangeValue = value['dateRange'];
            startDate = this.util.dateFormatForMySql(rangeValue[0].format('YYYY-MM-DD'));
            endDate = this.util.dateFormatForMySql(rangeValue[1].format('YYYY-MM-DD'));
        }

        const data = {
            productId: value.productId ? value.productId : 0,
            startDate: startDate ? value.startDate : '',
            endDate: endDate ? value.endDate : ''
        }

        console.log('fillter', data);
        
        this.setState({loading: true})
        const response = await this.service.purchaseItemReport(data.productId, data.startDate, data.endDate);

        if (response) {
            this.setState({data: response.data, loading: false});
        }

    }

    clearFilter() {
        this.getPurchaseReportList();
    }

    renderButtonAction() {
        return (
            <this.Space size="small" style={{marginBottom: '15px'}}>
                <div>
                    <div style={{display: 'none'}}>
                        <PrintStockReport data={this.state.data} ref={el => (this.componentRef = el)} />
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

    renderFilterRecord() {
        return <this.Form 
            className="site-layout-background" 
            style={{ margin: '18px 24px 0px 24px', backgroundColor: 'white' }}
            onFinish={(value) => this.onSubmitFilter(value)}>
            <this.Row style={{padding: '15px'}} gutter={[16, 16]}>
                <this.Col span={6} order={2}>
                    <this.Form.Item name="productId">
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
                            
                        >
                            {
                                this.state.products.map((item, i) => 
                                    <this.Option key={i} value={item.id}>{item.name}</this.Option>
                                )
                            }
                        </this.Select>
                    </this.Form.Item>
                </this.Col>
                <this.Col span={6} order={1}>
                    <this.Form.Item name="dateRange">
                        <this.RangePicker
                            ranges={{
                                Today: [moment(), moment()],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }}
                        />
                    </this.Form.Item>
                </this.Col>
                <this.Col span={6} order={3}>
                    <this.Space size="middle">
                        <this.Button htmlType="submit" type="primary">Search</this.Button>
                        <this.Button htmlType="button" type="primary" onClick={() => this.clearFilter()} danger>Clear Filter</this.Button>
                    </this.Space>
                </this.Col>
            </this.Row>
        </this.Form>
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