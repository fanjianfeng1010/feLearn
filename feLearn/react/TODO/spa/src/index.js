import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import A from './component/A';
import B from './component/B';
import C from './component/C';

ReactDOM.render(
  <HashRouter>
    <div>
      <Route path='/' component={A}></Route>
      <Route path='/user' component={B}></Route>
      <Route path='/pay' component={C}></Route>
    </div>

  </HashRouter>, document.getElementById('root'));

/**
 * 单页应用(SPA)
 *  只有一个页面,所有需要展示的内容都在这一个页面中实现切换,webpack 中只需要配置一个入口(移动端单页面应用居多或者 PC端管理系统类也是单页面应用为主)
 *
 *
 * 多页面应用(MPA)
 *  一个项目由多个页面组成,使用这个产品,主要就是页面之间的跳转(PC 端多页面应用居多);基于框架开发的时候,需要在 webpack 中配置多个入口,
 * 每个入口对应一个页面
 *
 *
 * 如何实现单页面应用?
 *  1.如果项目是基于服务器端渲染的,后台语言中可以基于"include"等技术,把很多部分拼凑在一起,实现组件化或者插件化开发
 *  也可以实现单页面应用
 *
 *  2.基于 iframe 实现单页面应用
 *
 *  3.模块化开发
 *  AMD:require.js
 *  CMD:sea.js
 *  基于这些思想把每一部分单独写成一个模块,最后基于 grount/dulp/fis 等自动化工具,
 * 最后把所有的模块都合并到首页面中(包括 HTML,CSS,JS 都合并在一起),通过控制哪些模块的显示隐藏实现单页应用开发
 *  弊端:由于首先中的内容包含了所有的模块信息,所以第一次加载速度很慢(虽然可以解决,但是相对来说比较麻烦)
 *
 * 4.基于 Vue/react 实现模块化组件开发,基于他们提供的路由实现 SPA 单页面应用,基于 webpack 打包等
 */

/**
 * 使用 react 路由实现 SPA
 *  1.安装路由 yarn add react-router-dom
 *
 * 2.学习 react 路由
 *  https://react-guide.github.io/react-router-cn/
 *
 * 3. BrowserRouter, HashRouter
 * 他是两种常用的路由实现思想,BrowserRouter浏览器路由, HashRouter哈希路由
 *
 * [BrowserRouter]
 *  他是基于H5 的 history API(pushState,replaceState,popstate)来保持 UI 和 URL 的同步,真实项目中应用的不多,一般只有当前项目
 * 是基于服务器端渲染的,我们才会使用浏览器路由
 *
 *
 * [HashRouter]
 *  真实项目中(前后端分离的项目:客户端渲染),我们经常使用的是哈希路由来完成的,它依据相同的页面地址,不同的哈希值,来规划当前页面中的哪一个组件呈现渲染,
 * 它基于原生 js 构造了一套类似于 history API 的机制,每一次路由切换都是基于 history stack 完成的
 *  1. 当前项目中一旦使用 hashrouter,则默认在页面的地址后面加上"#/",也就是 hash 默认值是一个斜杆,我们一般让其显示首页组件信息内容
 *
 * 2. hashrouter 中只能出现一个子元素
 *
 * 3. hashrouter 机制中,我们需要根据哈希地址不同,展示不同的组件内容,此时需要使用 route
 *
 * route:
 *  path:匹配哈希后面的值(地址),但是不是严格匹配,当前页哈希值地址只要包含完整的它(内容是不变的),都能匹配上
 *  component:一旦哈希值和当前 route的 path 相同了,则渲染 component 指定的组件
 *  exact:让 path 的匹配严谨和严格一些(只有 URL 哈希值和 path 设定的值相等才可以匹配到)
 *  render:当前页面的哈希地址和 path 匹配,会把 render 规划的方法执行,在方法中一般做"权限校验"(渲染组件之前验证是否存在权限,不存在做一些特殊处理)
 */

