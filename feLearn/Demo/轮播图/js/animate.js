/**
 * animate 动画库
 */
~ function () {
  // 准备操作css样式的方法 get-css / set-css / setGroupCss/ css
  let utils = (function () {
    // => 获取样式
    let getCss = (ele, attr) => {
      let val = null,
        reg = null
      if ('getComputedStyle' in window) {
        val = window.getComputedStyle(ele)[attr]
        reg = /^-?\d+(\.\d+)?(px|em|rem)?$/
        if (reg.test(val)) {
          val = parseFloat(val)
        }
      }
      return val
    }
    // =>设置样式
    let setCss = (ele, attr, value) => {
      if (!isNaN(value)) {
        if (!/^(opacity|zIndex)$/.test(attr)) {
          value += 'px'
        }
      }
      ele['style'][attr] = value
    }
    // => 批量设置样式
    const setGroupCss = (ele, options = {}) => {
      for (let attr in options) {
        if (options.hasOwnProperty(attr)) {
          setCss(ele, attr, options[attr])
        }
      }
    }

    let css = (...arg) => {
      let len = arg.length,
        fn = getCss
      if (len >= 3) {
        fn = setCss
      }
      if (len === 2 && typeof arg[1] === 'object') {
        fn = setGroupCss
      }
      return fn(...arg)
    }

    return {
      css
    }
  })()
  // => effect: 准备运动的公式
  let effect = {
    Linear: (t, b, c, d) => t / d * c + b
  }

  // => 封装动画库
  window.animate = function (ele, target = {}, duration = 1000, callback = new Function()) {
    // 不传递callback，让其默认为一个空函数（回调函数：当动画结束后做什么事情，都放到回调函数中完成即可）

    // 我们有四个参数，但是传递的时候只传了三个，最后一个回调函数传递给duration这个参数了，我们需要修改一下参数的值
    if (typeof duration === 'function') {
      callback = duration
      duration = 1000
    }

    // 1.基于target计算出begin/change
    let begin = {},
      chnage = {},
      time = 0;
    for (let attr in target) {
      if (target.hasOwnProperty(attr)) {
        begin[attr] = utils.css(ele, attr)
        chnage[attr] = target[attr] - begin[attr]
      }
    }

    // 2. 实现动画
    clearInterval(ele.animateTimer); // =>在给当前元素设置新的动画之前，先清空原有正在运行的动画(防止多动画共存，把动画的返回值赋值给当前元素的自定义属性
    // 这样只要元素不变，我们不管什么时候在哪里执行都可以清除元素动画)
    ele.animateTimer = setInterval(() => {
      time += 17;
      // => 边界判断
      if (time >= duration) {
        utils.css(ele, target)
        clearInterval(ele.animateTimer)
        callback.call(ele) // 动画完成后执行callback，并且让回调函数中的this是当前操作元素本身
        return
      }

      // =>依托target计算出每个方向的当前位置
      let cur = {}
      for (let attr in target) {
        if (target.hasOwnProperty(attr)) {
          cur[attr] = effect.Linear(time, begin[attr], chnage[attr], duration)
        }
      }
      utils.css(ele, cur)
    }, 17)
  }
}()