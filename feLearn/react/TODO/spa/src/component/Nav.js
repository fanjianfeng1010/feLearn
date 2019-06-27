import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

/*
* Link:是 react-router 中提供的路由切换组件,基于它可以实现点击的时候路由的切换
  TO [string]: 跳转到指定的路由地址
  TO [Object]: 可以提供一些参数配置项(和 redirect 类似)
    {
      pathname:跳转地址
      search:问号传参
      state:基于这种方式传递的信息
    }
    replace:bool 是替换 history stack 中当前的地址(true),还是追加一个新的地址(false)

    原理:基于 link 组件渲染,渲染后的结果就是一个 A 标签,TO 对应的信息最后变为 href 中的内容


    react-router 中提供的组件都要在任何一个 router(hash-router)包裹的范围内使用

    NavLink: 和 link 类似,都是为了实现路由切换跳转的,不同在于,nav-link 组件在当前页面 hash 和组件对应地址相吻合的时候,会默认给组件加一个 active 样式,让其有选中态
      和 link 类似,TO 和 replace 等属性都有,用法一样

      activeClassName: 把默认加的 active 样式类改为自己设定的
      activeStyle: 给匹配的这个 NavLink 设置行内样式
      exact & strict 控制匹配的时候是否严格匹配
      <NavLink to='/custom' /> 最后也会转换为 A 标签,如果当前页面的 hash 地址和此组件中的 TO 地址匹配了
        则会给渲染后的 A 标签设置默认的样式类:active
    
*/

class Nav extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (<div className='navbar navbar-default'>
      {/*LOGO */}
      <div className="container-fluid col-md-2">
        <Link to={{
          pathname: '/',
          search: '?lx=logo'
        }} className='navbar-brand '>这是一个标题</Link>
      </div>
      {/* NAV */}
      <div className="collapse navbar-collapse col-md-10">
        <ul className="nav navbar-nav">
          <li><NavLink exact to='/'>首页</NavLink></li>
          <li><NavLink to='/custom'>客户管理</NavLink></li>
          <li><NavLink to='/plan'>计划管理</NavLink></li>
        </ul>
      </div>
    </div>);
  }
}

export default connect()(Nav);