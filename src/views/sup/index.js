import React from "react";
import List from "../list/list";

export default class Supplier extends List {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }

        for (let i = 1; i <= 6; i++) {
            this.state.data.push({
                key: i,
                name: `Supplier ${i}`,
                phone: '010-432-001',
                email: `fazan${i}@gmail.com`,
                address: `Phnom Penh`
            });
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
                dataIndex: 'phone',
                key: 'phone',
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

    title = "Supplier"

    renderButtonAction() {
        return <div></div>
    }  
}