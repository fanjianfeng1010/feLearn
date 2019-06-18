/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import boostrap from './static/css/bootstrap.css';
import Proptype from 'prop-types';

class Vote extends React.Component {
  // => 组件传递的属性是只读的，我们为其设置默认值和相关规则
  static defaultProps = {}
  static propTypes = {
    title: Proptype.string.isRequired
  }
  constructor(props) {
    super(props)
    // => init state
    this.state = {
      n: 1, //=> 支持人数
      m: 0  // => 反对人数
    }

  }
  componentDidMount() {

  }
  render() {
    let { n, m } = this.state
    let rate = (n / (m + n) * 100).toFixed(2)
    return <section className='panel panel-default' style={{ width: '60%', margin: '20px auto' }}>
      <div className='panel-heading'>
        <h3 className='panel-title'>{this.props.title}</h3>
      </div>
      <div className='panel-body'>
        支持人数：{n}
        <br></br>
        反对人数：{m}
        <br></br>
        支持率：{rate ? (rate + '%') : 0}
      </div>
      <div className='panel-footer'>
        <button className='btn btn-primary' onClick={this.support}>支持</button>
        &nbsp;&nbsp;&nbsp;
        <button className='btn btn-danger' onClick={this.object}>反对</button>
      </div>
    </section>
  }
  support = ev => this.setState({ n: this.state.n + 1 })

  object = ev => this.setState({ m: this.state.m + 1 })

}

let root = document.querySelector('#root')
ReactDOM.render(<main>
  <Vote title='世界杯小组赛法国VS秘鲁' />
  <Vote title='世界杯小组赛阿根廷VS克罗地亚' />
</main>, root)