/* eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import '../static/css/banner.css';

export default class Banner extends React.Component {
  static defaultProps = {
    data: [],
    interval: 3000,
    step: 1,
    speed: 300
  }

  static propTypes = {
    data: PropTypes.array,
    interval: PropTypes.number,
    step: PropTypes.number,
    speed: PropTypes.number
  }
  constructor(props) {
    super(props)

    // init state
    let { step, speed } = this.props
    this.state = {
      step,
      speed
    }
  }

  //=> 数据的克隆
  componentWillMount() {
    let { data } = this.props
    // => 克隆数据
    let cloneData = data.slice(0)
    cloneData.push(data[0])
    cloneData.unshift(data[data.length - 1])
    this.cloneData = cloneData //=> 挂载到实例上供其他方法调用
  }

  //=> 自动轮播
  componentDidMount() {
    // 把定时器返回值挂载到实例上，方便后期清除，结束自动轮播
    this.autoTimer = setInterval(this.autoMove, this.props.interval)
  }

  //=> 控制轮播的极限值
  componentWillUpdate(nextProps, nextState) {
    //=> 边界判断：如果最新修改的step索引大于最大索引（说明此事已经是末尾了，不能再向后走了），我们让其立即回到（无动画）索引为1的位置
    if (nextState.step > (this.cloneData.length - 1)) {
      this.setState({
        step: 1,
        speed: 0
      })
    }
  }

  //=>
  componentDidUpdate() {
    //=> 只有是从克隆的第一张立即切换到真实第一张后，我们才做如下处理：让其从当前第一张运动到第二张即可
    let { step, speed } = this.state
    if (step === 1 && speed === 0) {
      //=> css3的transition有一个问题（主栈执行的时候，
      // 短时间遇到两次设置transition-duration的代码，以最后一次设置的为主） 这里把css3transition放到等待栈中执行
      let delayTimer = setTimeout(() => {
        clearTimeout(delayTimer)
        this.setState({
          step: step + 1,
          speed: this.props.speed
        })
      })

    }
  }

  render() {
    let { data } = this.props,
      { cloneData } = this
    if (data.length === 0) return ''

    // => 控制wrapper 的样式
    let { step, speed } = this.state
    let wrapperStyle = {
      width: cloneData.length * 1000 + 'px',
      left: -step * 1000 + 'px',
      transition: `left ${speed}ms linear 0ms`
    }

    return <section className='container'>
      <ul className='wrapper' style={wrapperStyle}>
        {cloneData.map((item, index) => {
          let { title, pic } = item
          return <li key={index}>
            <img src={pic} alt={title}></img>
          </li>
        })}
      </ul>
      <ul className='focus'>
        {data.map((item, index) => {
          let tempIndex = step - 1
          step === 0 ? tempIndex = data.length - 1 : null
          step === (cloneData.length - 1) ? tempIndex = 0 : null
          return <li key={index} className={tempIndex === index ? 'active' : ''}></li>
        })}
      </ul>
      <a href="javascript:;" className="arrow arrowLeft"></a>
      <a href="javascript:;" className="arrow arro"></a>
    </section>
  }

  // => 向右切换
  autoMove = () => {
    this.setState({
      step: this.state.step + 1
    })
  }
}