import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';

import Nav from './component/Nav';
import Home from './routes/Home';
import Custom from './routes/Custom';
import Plan from './routes/Plan';

import 'bootstrap/dist/css/bootstrap.min.css';
import './static/common.css'




render(
  <Provider store={store}>
    <HashRouter>
      <div>
        {/* nav:header 区域 */}
        <Nav />

        {/* 基于 hash-router 展示不同的页面 */}

        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/custom' component={Custom} />
          <Route path='/plan' component={Plan} />
          <Redirect to='/?lx=unsafe' />
        </Switch>
      </div>
      {/* NAV header 区域*/}
    </HashRouter>
  </Provider >, document.getElementById('root'));

