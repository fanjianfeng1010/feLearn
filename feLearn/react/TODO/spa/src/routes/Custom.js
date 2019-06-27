import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import List from './custom/List';
import Create from './custom/Create';
import Detail from './custom/Detail';

class Custom extends Component {
  constructor(props, conext) {
    super(props, conext);
    this.state = {}
  }
  render() {
    return (<section>
      {/* 左侧 menu 导航 */}
      <ul className="nav nav-pills nav-stacked col-md-2">
        <li className="presentation"><a href="javascript:;">客户列表</a></li>
        <li className="presentation"><a href="javascript:;">客增加客户信息</a></li>
      </ul>
      {/* 右侧内容管理,也是基于路由管理(二级路由 )*/}
      <div className="col-md-10">
        <Switch>
          {/* <Route path='/custom' exact component={List} /> */}
          <Route path='/custom/list' component={List} />
          <Route path='/custom/create' component={Create} />
          <Route path='/custom/Detail' component={Detail} />
          {/* 进入到客户管理页面,我们让其默认展示就是 List 区域内容 上述默认指定渲染组件的操作也可以,这种重定向的方式也可以*/}
          <Redirect from='custom' to='/custom/list' />
        </Switch>
      </div>
    </section>);
  }
}

export default connect()(Custom)