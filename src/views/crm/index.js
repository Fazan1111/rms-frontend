import List from "../list/list";
import CustomerService from "../../services/CustomerService";

export default class Customer extends List {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.columns = [
            {
                title: "Name",
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
                title: "Phone Number",
                dataIndex: 'contact',
                key: 'contact',
                fixed: 'left'
            },
            {
                title: "Email",
                dataIndex: 'email',
                key: 'email',
                fixed: 'left',
                sorter: (a, b) => a.email.length - b.email.length,
            },
            {
                title: "Address",
                dataIndex: 'address',
                key: 'address',
                fixed: 'left'
            }
        ]
    }

    title = "Customer";
    service = new CustomerService();

}