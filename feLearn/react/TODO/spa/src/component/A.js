import React from 'react';

class A extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (<section>
      我是 A 组件
    </section>);
  }
}

export default A;