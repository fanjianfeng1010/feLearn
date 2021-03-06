// 公共方法库

const utils = (function () {
  /**
   * 
   * @param {object} curEle :当前要操作的元素
   * @param {string} attr :当前要获取的样式属性名
   * 
   * @return {number}
   *  获取的上市属性值
   */
  const getCss1 = function (curEle, attr) {
    if (typeof window.getComputedStyle === 'undefined') {
      // 当前浏览器不兼容getComputedStyle
      return
    }
    let val = window.getComputedStyle(curEle, null)[attr]
    let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i
    reg.test(val) ? val = parseFloat(val) : null
    return val
  }
  /**
   * 
   * @param {object} curEle 当前操作元素
   * @param {string} attr 需要添加的属性
   * @param {string} value 属性的值
   * @return 
   */
  const setCss = function (curEle, attr, value) {
    /**
     * 细节处理
     * 1.如果要考虑IE6~8的兼容，透明度这个样式在低版本不是使用opacity,而是filter
     * 2.如果传递进来的值没有单位，我们根据情况设置px单位
     *  -> 某些样式属性才会加单位:width，height,padding,margin,font-size,top,left,right
     *  -> 用户自己传递的value值是没有单位的
     */
    if (attr === 'opacity') {
      curEle.style.opacity = value;
      curEle.style.filter = `alpha(opacity=${value * 100})`
      return
    }

    if (!isNaN(value)) {
      // isNaN 检测的结果是false，说明是纯数字没单位
      let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i
      reg.test(attr) ? value += 'px' : null
    }
    curEle['style'][attr] = value
  }

  /**
   * 批量给元素设置样式
   * @param {DOMobject} cruEle 
   * @param {object} options 
   */
  const setGroupCss = function (cruEle, options = {}) {
    //遍历传递进来的option，有多少键值对，就循环多少次，每一次调取setCss设置样式
    for (let attr in options) {
      if (options.hasOwnProperty(attr)) {
        setCss(cruEle, attr, options[attr])
      }
    }
  }
  // css:集合get/set/set/group的方法集合
  const css = function (...arg) {
    let len = arg.length
    let fn = getCss1
    len >= 3 ? fn = setCss : null
    len === 2 && (arg[1] instanceof Object) ? fn = setGroupCss : null
    return fn(...arg)
  }
  // => 获取当前元素距离body的偏移
  const offset = function (curEle) {
    // 1先获取当前元素的左/上偏移
    let cruLeft = curEle.offsetLeft,
      curTop = curEle.offsetTop,
      p = curEle.offsetParent
    // 2.累加父级参照物的边框和偏移（一直往上找，找到body位置，每当找到一个父级参照物都把他的边框和偏移量累加起来）
    while (p.tagName !== 'BODY') {
      // 3. 把找到的父级参照物的边框和偏移量累加起来
      cruLeft += p.clientLeft
      cruLeft += p.offsetLeft

      curTop += p.clientTop
      curTop += p.offsetTop


      p = p.offsetParent //基于当前元素找到父级参照物继续向上找
    }
  }
  // 操作浏览器盒子模型属性
  const winHandle = function (attr, value) {
    if (typeof value !== 'undefined') {
      document.documentElement[attr] = value
      document.body[attr] = value
      return
    }
    return document.documentElement[attr] || document.body[attr]
  }
  return {
    css,
    offset,
    winHandle
  }
})()