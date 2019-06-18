// eslint-disable
import React from 'react';
import PropTypes from 'prop-types';
import '../static/css/banner.css'

export default class BannerM extends React.Component {
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

    let { step, speed } = this.props
    this.state = {
      step,
      speed
    }
  }

  //=> 组件挂载到实例渲染之前，为了实现无缝轮播，需要在原有的数据里面可隆头尾
  componentWillMount() {
    let { data } = this.props
    let cloneData = data.slice(0)
    cloneData.push(data[0])
    cloneData.unshift(data[data.length - 1])
    this.cloneData = cloneData
  }

  componentDidMount() {
    this.autoTimer = setInterval(this.autoMove, this.props.interval)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.step > (this.cloneData.length - 1)) {
      this.setState({
        step: 1,
        speed: 0
      })
    }
  }

  componentDidUpdate() {
    let { step, speed } = this.state
    if (step === 1 && speed === 0) {
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

    //=> 控制wrapper样式
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
          return <li key={index}></li>
        })}
      </ul>
      <span className='arrow arrowLeft'></span>
      <span className='arrow arrowRIght'></span>
    </section>
  }
  autoMove = () => {
    this.setState({
      step: this.state.step + 1
    })
  }
}