import React, { Component } from 'react';
import { connect } from 'react-redux';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (<div>
      我是计划管理
    </div>);
  }
}

export default connect()(Plan)