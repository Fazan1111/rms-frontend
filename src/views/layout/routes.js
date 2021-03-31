import Home from '../home';
import Products from '../products/index';
import List from '../list/list';
import Employee from "../emp/index";
import Supplier from '../sup/index';
import Customer from '../crm/index';
import User from "../user/index";
import Category from "../cate/index";
import Purchase from "../transaction/purchase/index";
import Sale from "../transaction/sell/index";
import ReceivePayment from "../transaction/payment/index";

const routes = [
    {path: '/', exact: true, name: 'Home', component: Home},
    {path: '/category', name: 'Category', component: Category},
    {path: '/products', exact: true, name: 'Products', component: Products},
    {path: '/list', name: 'List', component: List},
    {path: '/employee', name: 'Employee', component: Employee},
    {path: '/supplier', name: 'Supplier', component: Supplier},
    {path: '/customer', name: 'customer', component: Customer},
    {path: '/user', name: 'User', component: User},
    {path: '/purchase', name: 'Purchase', component: Purchase},
    {path: '/sale', name: 'Sale', component: Sale},
    {path: '/payment', name: "ReceivePayment", component: ReceivePayment}
]

export default routes;