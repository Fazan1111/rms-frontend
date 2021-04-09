import React from "react";
import Component from "../../../share/component";
import Util from "../../../util/util";


export default class PrintStockReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            printData: []
        }

        this.util = new Util();
    }

    componentDidMount() {
        this.setState({printData: this.props.data})
    }

    componentWillReceiveProps(newProps) {
        this.setState({printData: newProps.data});
    }

    renderStockStatus(qty) {
        if (qty >= 500) {
            return <this.Tag style={{color: '#1890ff'}}>In Stock</this.Tag >;
        } else if (qty <= 500 && qty > 50) {
            return <this.Tag  style={{color: 'orange'}}>Warning</this.Tag >;
        } else if (qty < 50) {
            return <this.Tag  style={{color: 'red'}}>Out of Stock</this.Tag >;
        }
    }

    renderTotal() {
        let stockLen = this.state.printData.length;
        let totalStock = 0;
        if (stockLen > 0) {
            for (let i = 0; i < stockLen; i++) {
                totalStock += parseFloat(this.state.printData[i].qty);
            }
        }

        return this.util.quantityFormat(totalStock, 'Kg');
    }


    render() {
        console.log('data', this.state.printData);
        return (
            <div style={{margin: 'auto', width:'210mm', marginTop: '10px', padding: '20px'}}>
                <h2 style={{textAlign: 'center'}}>Stock Report</h2>

                <table border="1" style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                        <tr>
                            <th style={{width: '30px', textAlign: 'center'}}>N&deg;</th>
                            <th>Product Item</th>
                            <th>Product Code</th>
                            <th>Product Qty</th>
                            <th>Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.printData.map((item, i) =>
                                <tr key={i}>
                                    <td style={{textAlign: 'center'}}>{i + 1}</td>
                                    <td style={{padding: '8px'}}>{item.name}</td>
                                    <td style={{padding: '8px'}}>{item.sku}</td>
                                    <td style={{padding: '8px'}}>{this.util.quantityFormat(item.qty, 'Kg')}</td>
                                    <td style={{padding: '8px'}}>{this.renderStockStatus(item.qty)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}>Total</td>
                            <td>{this.renderTotal()}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }

}