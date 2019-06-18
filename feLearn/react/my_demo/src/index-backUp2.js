/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
// import Banner from './component/BannerSelect';
// import BannerM from './component/BannerM';

// 公共样式从index导入，组件独有样式从组件导入
import './static/css/reset.min.css'
import './static/css/bootstrap.min.css'
import BannerSelect from './component/BannerSelect';
import Vote from './component/Vote/Vote';

/* class A extends React.Component {
  constructor() {
    super()
    this.state = { n: 1 }
  }
  componentWillMount() {
    console.log('2=== willmount:第一次渲染之前', this.refs.HH);
  }
  componentDidMount() {
    console.log('3====didMount:第一次渲染之后', this.refs.HH);
    setInterval(() => {
      this.setState({ n: this.state.n + 1 })
    }, 1000)
  }

  shouldComponentUpdate() {
    console.log('4=== 是否允许更新');
    if (this.state.n > 3) {
      return false
    }
    return true
  }
  componentWillUpdate() {
    console.log('5===会更新');
  }
  componentDidUpdate() {
    console.log('6=== 更新后');
  }
  render() {
    console.log('RENDER');
    return <section ref='HH'>
      {this.state.n}
    </section>
  }
}
 */
let IMG_DATA = []

for (let i = 1; i <= 5; i++) {
  IMG_DATA.push({
    id: i,
    title: '',
    pic: require(`./static/images/${i}.jpg`)
  })
}

ReactDOM.render(<main>
  {/*
  * data:轮播图需要绑定的数据
  * interval：自动轮播的间隔
  * step：默认展示图片的索引
  * speed：每一张切换所需要的运动时间
  */}
  {/* <Banner data={IMG_DATA} interval={3000} step={2} speed={300} /> */}
  {/* <div style={{ margin: '20px' }}></div>
  <Banner data={IMG_DATA} interval={5000} step={1} speed={400} /> */}
  <BannerSelect step={1} data={IMG_DATA} interval={3000} speed={300}></BannerSelect>

  <Vote title={'英格兰对战巴拿马，哈里凯恩必胜'}></Vote>

</main>, root)