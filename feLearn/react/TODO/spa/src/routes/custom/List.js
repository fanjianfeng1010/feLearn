import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
  constructor(props, conext) {
    super(props, conext);
    this.state = {}
  }
  render() {
    return (<ul className='list-group'>
      <li className="list-group-item">
        编号:1
        &nbsp;&nbsp;&nbsp;
        姓名:XXX
      </li>
    </ul>);
  }
}

export default connect()(List)