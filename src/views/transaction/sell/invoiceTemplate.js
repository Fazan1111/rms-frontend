import React from "react";
import Component from "../../../share/component";
import Util from "../../../util/util";
import _enum from "../../enum";


export default class InvoiceTemplate extends Component {
    constructor(props) {
        super(props);
        this.logo = require("./../../../share/logo.png")
        this.util = new Util();
    }


    render() {
        console.log('data', this.props.data);
        let total = 0;
        if (this.props.data.billing) {
            this.props.data.billing.forEach(bill => {
                total += bill.tender;
            })
        }
        return(
            <div style={{padding: '30px', fontFamily: 'Khmer Os '}}>
                <table style={{width: '100%'}}>
                    <tr>
                        <td style={{width: '50%'}}>
                            <img src={this.logo} style={{width: '70px', marginBottom: '8px'}} />
                            
                            <h2>FR-Rice</h2>
                        </td>
                        <td style={{textAlign: 'right'}}>
                            <h2>Invoice</h2>
                            <h4>Invoice Date: {this.util.formatDate(this.props.data.sellData)}</h4>
                            <h4>Invoice No: {this.props.data.invoice}</h4>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2} style={{background: 'none'}}>
                            <hr />
                            <table style={{width: '100%'}}>
                                <tr>
                                    <td style={{background: 'none', height: '50px'}}><b>Bil To</b>: </td>
                                </tr>
                                <tr>
                                    <td style={{width: '150px', background: 'none', lineHeight: '12px'}}>
                                        <p>Customer Name</p>
                                        <p>Contact</p>
                                        <p>Address</p>
                                    </td>
                                    {
                                        this.props.data.customer ?
                                        <td style={{background: 'none', lineHeight: '12px'}}>
                                            <p>: {this.props.data.customer.name}</p>
                                            <p>: {this.props.data.customer.contact}</p>
                                            <p>: {this.props.data.customer.address}</p>
                                        </td>
                                        : ""
                                    }
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <table border="1" style={{width: '100%',  borderCollapse:'collapse'}}>
                                <thead>
                                    <tr style={{height: '30px', background: '#1890ff', color:'white'}}>
                                        <th style={{width: '20px', textAlign:'center'}}>No&deg;</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.data.sellItems ?
                                            this.props.data.sellItems.map((item, i) => 
                                                <tr key={i}>
                                                    <td style={{padding:'5px', textAlign: 'center', background:'none'}}>{i + 1}</td>
                                                    <td style={{padding:'5px', background: 'none'}}>{item.product.name}</td>
                                                    <td style={{padding:'5px', background: 'none'}}>{new Intl.NumberFormat().format(item.qty) + 'Kg'}</td>
                                                    <td style={{padding:'5px', background: 'none'}}>{this.util.currencyFormat(item.price)}</td>
                                                    <td style={{padding:'5px', background: 'none'}}>{this.util.currencyFormat(item.amount)}</td>
                                                </tr>
                                            )
                                            : ''
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={4}>Total</td>
                                        <td style={{textAlign: 'left', padding: '5px'}}>{this.util.currencyFormat(this.props.data.amount)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </td>
                    </tr> 

                    {

                        this.props.data.billing && this.props.data.billing.length > 0 ?
                        <tr>
                            <td colSpan={2} style={{textAlign: 'right', background: 'none'}}>
                                <table style={{
                                        width: '380px', 
                                        border: '1px solid #ddd', 
                                        marginTop: '20px',
                                        textAlign: 'left',
                                        lineHeight: '10px'
                                }}>
                                    {
                                        this.props.data.billing.map((bill, i) =>
                                            <tr key={i}>
                                                <td style={{padding: '10px', background: 'none'}}>
                                                    <p>- {this.util.formatDate(bill.payDate)}</p>
                                                </td>
                                                <td  style={{padding: '8px 6px 0 7px', background: 'none'}}>
                                                    <p style ={{width: '100px'}}>: {this.util.currencyFormat(bill.tender, '៛')} </p> <p>: By {bill.payMethod.name} </p>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    <tr>
                                        <td style={{padding: '10px', background: 'none'}}>Total</td>
                                        <td style={{padding: '10px', background: 'none'}}>: {this.util.currencyFormat(total)}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        : ''
                    }

                    <tr>
                        <td colSpan={2} style={{textAlign: 'center', background: 'none', paddingTop: '25px', lineHeight: '12px'}}>
                            <p>ឃ្លាំងអង្ករ FR-Rice មានលក់ស្រូវ និងអង្ករគ្រប់ប្រភេទ</p>
                            <p>អាស័យដ្ឋាន ផ្ទះលេខ 12E ផ្លូវជាតិលេខ៦​ សង្កាត់ច្រាំងចំរេះ ខណ្ឌឫស្សីកែវ រាជធានីភ្មំពេញ</p>
                            <p>ទំនាក់ទំនងទូរស័ពលេខ 010-646913/012-343-009</p>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}