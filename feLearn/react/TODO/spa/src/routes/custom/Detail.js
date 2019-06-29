import React, { Component } from 'react';
import { connect } from 'react-redux';
import QS from 'qs';

class Detail extends Component {
  constructor(props, conext) {
    super(props, conext);
  }


  render() {
    /*   // 1. 问号传参
      let { location: { search }, data } = this.props,
        customID = QS.parse(search.substr(1)).id || 0
      customID = parseFloat(customID) */
    //=> 2. 基于 state 传值
    /*  let { loaction: { state }, data } = this.props,
       customID = state || 0
     customID = parseFloat(customID) */

    //=> 3. url 地址参数
    let { match: { params }, data } = this.props,
      customID = params.id || 0;//=>path='/custom/detail/:id' 路由冒号后面的值就是以后解析时候的属性名
    customID = parseFloat(customID);

    //=> 筛选和渲染
    let item = data.find(item => parseFloat(item.id) === customID)
    if (!item) return '当前用户不存在'
    return (<div>
      编号:{item.id}
      <br />
      姓名:{item.name}
    </div>);
  }
}

export default connect(state => ({ ...state.custom }))(Detail)