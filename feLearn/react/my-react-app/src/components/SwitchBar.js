import React from 'react';

import '../css/reset.less'
import '../css/switchBar.less'

export default class SwitchBar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      list: [
        { title: '新闻啊', id: 1 },
        { title: '音乐', id: 2 },
        { title: '无聊', id: 3 },
      ],
      content: [
        { item: '内容一' },
        { item: '内容二' },
        { item: '内容三' }
      ],
      currentIndex: 1
    }
  }

  render() {

    return <div className='container'>
      <ul className='wrapper'>
        {
          this.state.list.map((item, index) => {
            return <li key={index} onClick={() => {
              this.setState({ currentIndex: index + 1 })
            }}
              className={this.state.currentIndex === (index + 1) ? 'active' : null} >{item.title}</li>
          })
        }
      </ul>
      {
        this.state.content.map((item, index) => {
          return <div key={index} className={this.state.currentIndex === (index + 1) ? 'active' : null}>
            {item.item}
          </div>
        })
      }
    </div>
  }
}