import Home from '../home';
import Products from '../products/index';
import List from '../list/list';
import Supplier from '../sup/index';
import Customer from '../crm/index';
import User from "../user/index";

const routes = [
    {path: '/', exact: true, name: 'Home', component: Home},
    {path: '/products', exact: true, name: 'Products', component: Products},
    {path: '/list', name: 'List', component: List},
    {path: '/supplier', name: 'Supplier', component: Supplier},
    {path: '/customer', name: 'customer', component: Customer},
    {path: '/user', name: 'User', component: User}
]

export default routes;