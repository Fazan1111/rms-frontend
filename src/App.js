import React from 'react';
import './App.css';
import Master from './views/layout/master';
import Login from "./views/auth/login";
import Util from './util/util';


class App extends  React.Component {
  constructor() {
    super()
    this.util = new Util();
    this.state = {
      token: this.util.getApiToken()
    }
  }


  render() {

    console.log('ddd', this.state.token);

    if(!this.state.token) {
      return <Login />
    }
    return(
      <div>
        <Master />
      </div>
    )
  }
}

export default App;
