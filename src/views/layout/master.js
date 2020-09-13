import React from 'react';
import routes from './routes';
import {Switch, Route} from 'react-router-dom';
import {Layout} from 'antd';

import Sidebar from './sidebar';

class Master extends React.Component {
    render() {
        return(
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Switch>
                    {routes.map((route, i) => {
                        return route.component ? (
                            <Route 
                                key = {i}
                                path = {route.path}
                                exact = {route.exact}
                                name = {route.name}
                                render = {props => (
                                    <route.component {...props} />
                                )}
                            />
                        ): (null);
                    })}
                    
                </Switch>
            </Layout>
        )
    }
}

export default Master;

// <Switch>
//     <Route exact path='/' component = {Home}></Route>
//     <Route path='/about' component = {About}></Route>
//     <Route path='/students' component = {Products}></Route>        
// </Switch>