import React from "react";
import Component from "../../../share/component";
import Util from "../../../util/util";


export default class PrintSaleItemReport extends Component {
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

    renderTotal() {
        let productLen = this.state.printData.length;
        let totalStock = 0;
        if (productLen > 0) {
            for (let i = 0; i < productLen; i++) {
                totalStock += parseFloat(this.state.printData[i].qty);
            }
        }

        return this.util.quantityFormat(totalStock, 'Kg');
    }


    render() {
        console.log('data', this.state.printData);
        return (
            <div style={{margin: 'auto', width:'210mm', marginTop: '10px', padding: '20px'}}>
                <h2 style={{textAlign: 'center'}}>Sale Items Report</h2>

                <table border="1" style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                        <tr>
                            <th style={{width: '30px', textAlign: 'center'}}>N&deg;</th>
                            <th>Product Item</th>
                            <th>Product Code</th>
                            <th>Product Qty</th>
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