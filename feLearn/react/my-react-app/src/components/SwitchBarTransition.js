/* eslint-disable */
import React from 'react';

import '../css/reset.less'

export default class SwitchBarTransition extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <section className='container'>
      <ul className='tab-pane'>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="wrapper">
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
      </div>
    </section>
  }
}