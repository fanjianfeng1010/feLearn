import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DatePicker, Icon, Button, LocaleProvider, Calendar } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import '../static/antd.css'

import '../static/antd.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    //=> 只要 localProvider 包含的组件都是被汉化的
    return (<LocaleProvider locale={zh_CN}>
      <Button></Button>
    </LocaleProvider>);
  }
}

export default connect()(Home)