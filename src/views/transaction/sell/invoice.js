import React from "react";
import Component from "../../../share/component";
import InvoiceTemplate from "./invoiceTemplate";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

export default class SellInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            detail: {}
        }
    }

    componentDidMount() {
        this.setState({detail: this.props.formData});
    }

    componentWillReceiveProps(newProps) {
        this.setState({detail: newProps.formData});
    }

    render() {
        return(
            <div>  
                <InvoiceTemplate data={this.state.detail} ref={el => (this.componentRef = el)} />

                <ReactToPrint content={() => this.componentRef}>
                    <PrintContextConsumer>
                        {({ handlePrint }) => (
                            <div style={{textAlign: 'center', marginTop: '20px'}}>
                                <this.Button onClick={handlePrint} type="primary" >
                                    Print Invoice 
                                </this.Button>
                            </div>
                        )}
                    </PrintContextConsumer>
                </ReactToPrint>

            </div>
        )
    }
}