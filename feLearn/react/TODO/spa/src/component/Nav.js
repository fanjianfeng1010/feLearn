import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

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
    
        WithRouter: 这个方法的意思是吧一个非路由管控的组件模拟成为路由管控的组件

        受路由管控组件的一些特点:
          1: 只有当前页面哈希地址和路由指定的地址匹配才会把对应的组件渲染
          ( WithRouter:是没有地址匹配都会模拟成为受路由管控的)
          2: 路由切换的原理:凡是匹配的路由,都会把对应组件内容重新添加到页面中,相反,不匹配的都会在页面中移除掉,下一次重新匹配上
          ,组件需要重新渲染到页面中,每一次路由切换的时候,页面的哈希路由地址改变,都会从一级路由重新校验一遍
          3: 所有受路由管控的组件,在组件中的属性 props 上都默认添加了三个属性:
            history
              push
              go 
              go-back
              go-forward

            location 获取当前哈希路由渲染组件的一些信息
              pathname:当前哈希路由地址 /custom/list
              search:当前页面的问号传参值 ?lx=unsafe
              state:基于 redirect/link/navLink 中的 TO,传递的是一个对象,对象中编写的 state,就可以在 location.state 中获取到

            match 获取的是当前路由匹配的一些结果
              params:如果当前路由匹配的是地址路径参数,则这里可以获取传递参数的值

*/

class Nav extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      count: 1
    }
    console.log(props);
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
        <ul className="nav navbar-nav" onClick={this.handleClick}>
          {/*NavLink 不是点击谁,谁有选中样式(但是可以路由切换),而是当前页面哈希后的地址和 navLink中的 to 进行比较,哪个匹配了,哪个才有选中的样式 */}
          <li><NavLink exact to='/' >首页</NavLink></li>
          <li><NavLink to='/custom'>客户管理</NavLink></li>
          <li><NavLink to='/plan'>计划管理</NavLink></li>
        </ul>
      </div>
    </div>);
  }

  handleClick = ev => {
    this.setState({
      count: this.state.count + 1
    })
  }
}

export default connect()(withRouter(Nav));

//export default withRouter(connect()(Nav))