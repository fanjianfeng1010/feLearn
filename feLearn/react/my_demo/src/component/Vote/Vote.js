/* eslint-disable */
import React from 'react';

import VoteHead from "./VoteHead"
import VoteBody from "./VoteBody"
import VoteFooter from "./VoteFooter"

class Vote extends React.Component {
  static defaultProps = {
    title: '标题'
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let { title } = this.props
    return <div className="panel panel-default" style={{ width: '50%', margin: '20px auto' }}>
      <VoteHead title={title}></VoteHead>
      <VoteBody></VoteBody>
      <VoteFooter></VoteFooter>
    </div>
  }
}

export default Vote;