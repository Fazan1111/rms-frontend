import TestTable from "./index";



export default class TestTable2 extends TestTable {
    title = "Test 2";
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'Name',
                width: 100,
                dataIndex: 'name',
                key: 'name',
                fixed: 'left'
            },
            {
                title: 'Gender',
                width: 100,
                dataIndex: 'gender',
                key: 'gender',
                fixed: 'left'
            },
            {
                title: 'Age',
                width: 100,
                dataIndex: 'age',
                key: 'age',
                fixed: 'left'
            }
        ]
    }
}