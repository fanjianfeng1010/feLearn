/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import action from '../store/action';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.showData = [
      { text: '全部', flag: 'all' },
      { text: '已完成', flag: 'complete' },
      { text: '未完成', flag: 'uncomplete' }
    ]
  }
  render() {
    let { flag } = this.props,
      { showData } = this
    return (<div className="panel-footer">
      <ul className="nav nav-pills" onClick={this.updateFilter}>
        {
          showData.map((item, index) => {
            let { text, flag: itemFlag } = item
            return (<li key={index} className={flag === itemFlag ? 'active presentation' : 'presentation'}>
              <a href="javascript:;" flag={itemFlag}>{text}</a>
            </li>)
          })
        }
      </ul>
    </div>);
  }

  updateFilter = ev => {
    let target = ev.target,
      tarTag = target.tagName
    //=> 合并事件源：事件源是LI，让其变为里面的A
    if (tarTag === 'LI') {
      target = target.firstElementChild
      tarTag = target.tagName
    }
    if (tarTag === 'A') {
      let text = target.getAttribute('flag')
      if (this.props.flag === text) {
        //=> 当前筛选状态和点击的按钮是一致的，这样是没必要再重新更新筛选状态的

        return
      }
      this.props.filter(text)
    }
  }
}

export default connect(state => ({ ...state.todo }), action.todo)(Footer);