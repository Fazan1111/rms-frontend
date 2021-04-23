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
import ReceivePayment from "../report/payment";
import PurchaseItemReport from "../report/purchaseItem";
import SellItemReport from "../report/sellItem";
import StockReport from "../report/stock";
import ActivityLog from "../user/activity";

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
    {path: '/user-activity', name: 'ActivityLog', component: ActivityLog},
    
    //Report
    {path: '/report/payment', name: "ReceivePayment", component: ReceivePayment},
    {path: '/report/purchase-items', name: 'PurchaseItemReport', component: PurchaseItemReport},
    {path: '/report/sell-items', name: 'SellItemReport', component: SellItemReport},
    {path: '/report/stock', name: "StockReport", component: StockReport}
]

export default routes;