/* eslint-disable */
import React from 'react';

export default class VoteBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return <div className="panel-body">
      支持人数: <span>0</span>
      <br />
      反对人数: <span>0</span>
      <br />
      支持率:   <span>0.00%</span>
    </div>
  }
}
