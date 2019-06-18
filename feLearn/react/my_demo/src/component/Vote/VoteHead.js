/* eslint-disable */
import React from 'react';
class VoteHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return <div className="panel-heading">
      <h3 className="panel-title">{this.props.title}</h3>
    </div>
  }
}

export default VoteHead;