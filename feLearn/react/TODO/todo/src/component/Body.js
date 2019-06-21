/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import action from '../store/action';
class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    //=> 获取redux中的任务数据,根据flag表示，筛选对应的内容
    let { data, flag } = this.props
    data = data.filter(item => {
      let { state } = item
      if (flag === 'complete') {
        return parseFloat(state) === 1
      }
      if (flag === 'uncomplete') {
        return state === 0
      }
      return true
    })

    return (
      <div className="panel-body">
        <ul className="list-group">
          {
            data.map((item, index) => {
              let { id, name, state } = item
              state = parseFloat(state)
              return (<li className="list-group-item" key={index}>
                <input type="checkbox" name='todo' checked={!!state} onChange={ev => {
                  //=> 更新状当前任务的状态信息
                  let newState = ev.target.checked ? 1 : 0
                  this.props.updateState(id, newState)
                }} />
                <span className={state === 1 ? 'complete' : ''}>{name}</span>
                <a href="javascript:;" className='btn-danger' onClick={
                  ev => {
                    let isOK = window.confirm('删了就找不回了哦,确定?')
                    if (isOK) {
                      this.props.remove(id)
                    }
                  }
                }>删除</a>
              </li>)
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(state => ({ ...state.todo }), action.todo)(Body);