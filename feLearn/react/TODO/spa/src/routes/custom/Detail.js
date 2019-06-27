import React, { Component } from 'react';
import { connect } from 'react-redux';

class Detail extends Component {
  constructor(props, conext) {
    super(props, conext);
    this.state = {}
  }
  render() {
    return (<div>
      编号:1
      <br/>
      姓名:xxx
    </div>);
  }
}

export default connect()(Detail)