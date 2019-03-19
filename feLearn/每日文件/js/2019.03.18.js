// // 获取当前页面一屏幕（可视区）的宽高
// document.documentElement.clientWidth || document.body.clientWidth // 后面是兼容ie低版本浏览器
// document.documentElement.clientHeight || document.body.clientHeight

// // clientTop & clentLeft 获取当前页面边框的宽度
// // 获取当前页面真实的宽高(包含溢出的部分)
// document.documentElement.scrollHeight || document.body.scrollHeight // 后面是兼容ie低版本浏览器
// document.documentElement.scrollWidth || document.body.scrollWidth

/**
 * 
 * @param {object} curEle :当前要操作的元素
 * @param {string} attr :当前要获取的样式属性名
 * 
 * @return {number}
 *  获取的上市属性值
 */
/* let getCss = function getCss(curEle, attr) {
  if ('getComputedStyle' in window) {
    let val = window.getComputedStyle(curEle, null)[attr]
    // 把获取的值的结果都去掉单位（不是所有的值都能去单位的，例如复合的值）,只有符合 数字 + 单位 这种模式的结果才能基于parseFloat 去单位
    let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)$/i
    reg.test(val) ? val = parseFloat(val) : null
    return val
  }
  throw new SyntaxError('浏览器版本过低，请升级到最新版本');
}
console.log(getCss(outer, 'padding'))
console.log(getCss(outer, 'display'))
 */
/* const getCss1 = function (curEle, attr) {
  if (typeof window.getComputedStyle === 'undefined') {
    // 当前浏览器不兼容getComputedStyle
    return
  }
  let val = window.getComputedStyle(curEle, null)[attr]
  let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i
  reg.test(val) ? val = parseFloat(val) : null
  return val
}
 */

/**
 * 
 * @param {object} curEle 当前操作元素
 * @param {string} attr 需要添加的属性
 * @param {string} value 属性的值
 * @return 
 */
// JS中给元素也只样式的方法只有两种
// 1.设置元素的样式类名
// 2.设置行内样式
/* const setCss = function (curEle, attr, value) {
  **
   * 细节处理
   * 1.如果要考虑IE6~8的兼容，透明度这个样式在低版本不是使用opacity,而是filter
   * 2.如果传递进来的值没有单位，我们根据情况设置px单位
   *  -> 某些样式属性才会加单位:width，height,padding,margin,font-size,top,left,right
   *  -> 用户自己传递的value值是没有单位的
   *
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
} */
/**
 * 批量给元素设置样式
 * @param {DOMobject} cruEle 
 * @param {object} options 
 */
/* const setGroupCss = function (cruEle, options = {}) {
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
  if (len > 3) {
    setCss(...arg)
  }
  if (len === 2 && typeof arg[1] === 'object' && arg[1] !== null) {
    setGroupCss(...arg)
    return
  }
  return getCss1(...arg)
}
// 上面代码的优化
const css = function (...arg) {
  let len = arg.length
  let second = arg[1]
  let fn = getCss1
  len > 3 ? fn = setCss : null
  len === 2 && (second instanceof Object) ? fn = setGroupCss : null
  return fn(...arg)
} */