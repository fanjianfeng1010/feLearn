/* eslint-disable *//* eslint-disable */
import React from 'react';
class VoteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return <div className="panel-footer">
      <button className="btn btn-success">支持</button>

      <button className="btn btn-danger">反对</button>
    </div>
  }
}

export default VoteFooter;