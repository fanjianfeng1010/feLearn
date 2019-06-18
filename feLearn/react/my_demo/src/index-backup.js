/* eslint-disable no-useless-constructor */
// eslint-disable-next-line 
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom'
import './static/css/reset.min.css'
import './static/css/bootstrap.min.css'
import PropTypes from 'prop-types';

let root = document.querySelector('#root')

class Clock extends React.Component {
  constructor() {
    super()
    this.state = {
      time: new Date()
    }
  }

  componentDidMount() {
    // => react声明周期函数：第一次组件渲染完成后触发（我们在这里只需要间隔100Ms把state状态中的time数据改变，这样react会自动帮我们
    // 把组件中的部分内容进行重新渲染
    this.timerId = setInterval(() =>
      // => react中虽然下面方式可以修改状态，但是并不会通知react重新渲染页面，所以不要这样去操作和修改状态
      /* this.state.time = new Date().toLocaleDateString() */
      this.tick(), 100)
  }

  componentWillMount() {
    clearInterval(this.timerId)
  }

  tick() {
    this.setState({
      time: new Date()
    }, () => {
      // => 当通知react把需要重新渲染的JSX元素渲染完成后，执行的回调操作（类似于生命周期函数中的componentDidUpdate，项目中一般使用钩子函数而不是这个回调）
      // => 设置回调函数的原因，setState是异步操作
    })
  }

  render() {
    return <section>
      <h3>当前时间为：</h3>
      <div style={{ color: 'red', fontWeight: 'bold' }}>
        {this.state.time.toLocaleTimeString()}
      </div>
    </section>
  }
}

class DialogClass extends React.Component {
  static propTypes = {
    con: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    let { con } = this.props
    return <section>
      <span>{con}</span>
    </section>
  }
}
ReactDOM.render(<main>
  <Clock />
</main >, root)
/* }
ReactDOM.render(<main>
  <Dialog content='马哥真有钱'></Dialog>

  <Dialog type={2} content='马哥qs'></Dialog>

  <Dialog type='请登录' content={'新的jsx语法'}>
    <button className='btn btn-success'>完了呀</button>
    <button className='btn btn-danger'>完了呀</button>
  </Dialog>
</main>, root)
 */
/**
 * ReactDOM.render([JSX],[container],[callback]):把JSX元素渲染到页面中
 * JSX:react虚拟元素
 * container：容器，我们想把元素放到页面中的那个容器中
 * callback：当把内容放到页面中呈现触发的回调函数
 *
 *
 * JSX：react独有的语法 JavaScript + XML（HTML）
 *  和自己拼接的HTML字符串类似，都是把HTML结果代码和JS代码或者数据混合在一起了，但是它不是字符串
 *  1. JSX中出现{}是存放JS的，但是要求JS代码执行完成有返回结果（JS表达式）
 *    =》不能直接放一个对象数据类型的值（对象、数组、函数都不行）
 *    =》 可以是基本类型（布尔类型什么都不显示、null、undefined也是JSX元素，代表的是空）
 */

