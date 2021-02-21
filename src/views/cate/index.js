import React from "react";
import List from "../list/list";
import CategoryService from "../../services/CategoryService";

export default class Category extends List {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "Name",
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
                title: "Code",
                dataIndex: 'code',
                key: 'code',
                fixed: 'left',
            },
            {
                title: "note",
                dataIndex: 'note',
                key: 'note',
                fixed: 'left',
            },
        ]

        this.service = new CategoryService();
    }

}