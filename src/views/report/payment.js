import React from "react";
import ReceivePaymentService from "../../services/ReceivePaymentService";
import Util from "../../util/util";
import List from "../list/list";
import PrintPayment from "./prints/printPayment";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { CSVLink } from "react-csv";

export default class ReceivePayment extends List {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Invoice No",
        dataIndex: 'sell',
        key: 'sell',
        fixed: 'left',
        render: (record) => {
          return record.invoice;
        }
      },
      {
        title: "Pay Date",
        dataIndex: 'payDate',
        key: 'payDate',
        fixed: 'left',
        render: (payDate) => {
          return this.util.formatDate(payDate);
        }
      },
      {
        title: "Customer",
        dataIndex: 'sell',
        key: 'sell',
        fixed: 'left',
        render: (sell) => {
          return sell.customer.name;
        }
      },
      {
        title: "Received By",
        dataIndex: 'employee',
        key: 'employee',
        fixed: 'left',
        render: (emp) => {
          return emp.fname + " " + emp.lname;
        }
      },
      {
        title: "Amount",
        dataIndex: 'tender',
        key: 'tender',
        fixed: 'left',
        sorter: (a, b) => a.tender - b.tender,
        render: (tender) => {
          return new Intl.NumberFormat().format(tender) + '៛';
        },
      },
      {
        title: "Paid By",
        dataIndex: 'payMethod',
        key: 'payMethod',
        fixed: 'left',
        render: (payMethod) => payMethod.name
      }
    ];
    this.service = new ReceivePaymentService();
    this.util = new Util();
    this.title = "Received Payment";

    this.excelHeaders = [
      {label: "Invoice No", key: "sell.invoice"},
      {label: "Payment Date", key: "payDate"},
      {label: "Customer", key: "sell.customer.name"},
      {label: "Received By", key: "employee.lname"},
      {label: "Amount", key: "tender"},
      {label: "Paid By", key: "payMethod.name"}
    ]
  }

  renderButtonAction() {
    return (
      <this.Space size="small" style={{marginBottom: '15px'}}>
        <div>
          <div style={{display: 'none'}}>
              <PrintPayment data={this.state.data} ref={el => (this.componentRef = el)} />
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
              filename={"invoicePaymentReport.csv"}
          >
              <this.Button type="primary" style={{background: 'green', color: 'white'}}>
                  Export to Excel
              </this.Button>
          </CSVLink>
        </div>
      </this.Space>
    )

 }

}