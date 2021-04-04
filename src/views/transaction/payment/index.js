import React from "react";
import ReceivePaymentService from "../../../services/ReceivePaymentService";
import Util from "../../../util/util";
import List from "../../list/list";

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
  }

  renderButtonAction() {
    return (
      <div></div>
    )
}
}