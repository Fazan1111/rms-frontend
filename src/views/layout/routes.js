import Home from '../home';
import About from '../about';
import Products from '../products/index';
import CreateProduct from '../products/create';

const routes = [
    {path: '/', exact: true, name: 'Home', component: Home},
    {path: '/about', name: 'About', component: About},

    {path: '/products', exact: true, name: 'Products', component: Products},
    {path: '/products/create', name: 'createProduct', component: CreateProduct}

]

export default routes;