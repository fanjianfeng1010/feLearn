import React, { Component } from 'react';
import { connect } from 'react-redux';

class Create extends Component {
  constructor(props, conext) {
    super(props, conext);
    this.state = {}
  }
  render() {
    return (<div>
      用户编号:<input type="text" />
      <br /><br />
      用户姓名: <input type="text" />
      <br /><br />
      <button>增加用户信息</button>
    </div>);
  }
}

export default connect()(Create)