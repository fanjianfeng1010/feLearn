/* eslint-disable */
import React from 'react';
import '../static/css/banner.css'

export default class BannerSelect extends React.Component {
  // => 组件属性不可更改，但是可是设置默认值
  static defaultProps = {
    data: [],
    interval: 3000,
    step: 1,
    speed: 300
  };

  constructor(props) {
    super(props);

    //=> 初始化状态
    let { step, speed } = this.props;
    this.state = {
      step,
      speed
    };
  }

  componentWillMount() {
    let { data } = this.props,
      cloneData = data.slice(0);
    cloneData.push(data[0]);
    cloneData.unshift(data[data.length - 1]);
    this.cloneData = cloneData;
  }

  componentDidMount() {
    // 开启自动轮播
    this.autoTimer = setInterval(this.moveRight, this.props.interval);

  }

  componentWillUpdate(nextProps, nextState) {
    //=> 向右边界判断：如果当前最新修改的step已经大于最大索引，说明不能继续向右走了，我们应该让其立刻（无动画）回到真实第一张
    if (nextState.step > (this.cloneData.length - 1)) {
      this.setState({
        step: 1,
        speed: 0
      })
    }

    //=> 向左边界判断:如果当前最新修改的索引已经小于0，说明不能继续往左做了，我们让其立即回到“倒数第二张”图片位置（其实就是真实最后一张图片） step= cloneData.length - 2
    if (nextState.step < 0) {
      this.setState({
        step: this.cloneData.length - 2,
        speed: 0
      });
    }
  }

  componentDidUpdate() {
    // 向右边界判断，立即回到第一张后，我们应该让其运动到真实的第二张
    let { step, speed } = this.state
    // => 因为新版本浏览器对设置属性的优化，会按照最后一次设置的样式进行渲染，由于这里也设置了speed 300ms,
    // 浏览器会忽略willUpdate中设置的transition 0ms,
    // transition 会一直以300ms为参照，也就是说在生命周期willUpdate中设置的speed 0 对transition的样式修改不生效，
    // 过渡动画还是会以300ms渲染，用户可以看到瞬间从最后一张拉取到第一张切换的画面，此时应该把设置的任务放到等待序列中，
    // 好让设置生效

    //=> 向右边界判断
    if (step === 1 && speed === 0) {
      let delayTimer = setTimeout(() => {
        clearTimeout(delayTimer);
        this.setState({
          step: step + 1,
          speed: this.props.speed
        });
      }, 0);
    }

    //=> 向左边界判断：立即回到倒数第二张后，我们应该让其向回再运动一张
    if (step === this.cloneData.length - 2 && speed === 0) {
      let delayTimer2 = setTimeout(() => {
        clearTimeout(delayTimer2)
        this.setState({
          step: step - 1,
          speed: this.props.speed
        })
      }, 0)
    }
  }
  render() {
    let { data, style } = this.props,
      { cloneData } = this

    if (data.length === 0) return ''
    //=> 计算wrapper样式
    let { step, speed } = this.state
    let wrapperStyle = {
      width: `${cloneData.length * 1000}px`,
      transform: `translateX(${-step * 1000}px)`,
      transition: `transform ${speed}ms`
    }
    return <section className={"container"}
      onMouseEnter={this.movePause}
      onMouseLeave={this.movePlay}
      onClick={this.handleClick}>
      <ul className={"wrapper"} style={wrapperStyle}
        onTransitionEnd={() => {
          this.isRun = false
        }}>
        {
          cloneData.map((item, index) => {
            let { title, pic } = item
            return <li key={index}>
              <img src={pic} alt={title} />
            </li>
          })
        }
        {/* <li><img src="" alt="" /></li> */}
      </ul>
      <ul className={'focus'}>
        {
          data.map((item, index) => {
            let tempIndex = step - 1
            step === 0 ? tempIndex = data.length - 1 : null
            step === (cloneData.length - 1) ? tempIndex = 0 : null
            return <li key={index} className={tempIndex === index ? 'active' : ''}></li>
          })
        }
      </ul>
      <a href="javascript:;" className="arrow arrowLeft"></a>
      <a href="javascript:;" className="arrow arrowRight"></a>
    </section>
  }

  moveRight = () => {
    this.setState({
      step: this.state.step + 1
    })
  }

  //=> 自动轮播的开启和暂停
  movePause = () => {
    clearInterval(this.autoTimer)
  }
  movePlay = () => {
    this.autoTimer = setInterval(this.moveRight, this.props.interval)
  }

  //=> 事件委托
  handleClick = ev => {
    let target = ev.target,
      tarTag = target.tagName,
      tarClass = target.className

    //=> 左右切换
    if (tarTag === 'A' && /(^| +)arrow( +|$)/.test(tarClass)) {
      //=> 防止点击过快
      if (this.isRun) return
      this.isRun = true
      //=> RIGHT
      if (tarClass.indexOf('arrowRight') >= 0) {
        this.moveRight()
        return
      }
      //=> left
      this.setState({
        step: this.state.step - 1
      })
      return
    }
  }
}
