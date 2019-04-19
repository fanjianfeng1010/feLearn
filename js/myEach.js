// 实现each方法，可以遍历数组，对象，类数组
let each = function (obj, callback) {
  // => 验证是数组（类数组）还是对象
  let flag = 'length' in obj // => 简单验证：有length就是类数组，没有就是对象
  if (flag) {
    for (let i = 0; i < obj.length; i++) {
      let item = obj[i]
      let res = callback && callback.call(item, i, item) // 改变this的指向，让this指向当前item => 接收函数返回值，如果返回的是false，结束当前迭代
      if (res === false) {
        break
      }
    }
  } else {
    for (let key in obj) {
      let item = obj[key]
      if (obj.hasOwnProperty(item)) {
        let res = callback && callback.call(item, key, value)
        if (res === false) {
          break
        }
      }

    }
  }
}

const myRepalce = (string, reg, callback) {
  let match = string.match(reg)
  for (let i = 0; i < match.length; i++) {
    let item = match[i]
    callback && callback(item)
  }
}

String.prototype.myRepalce = function (reg, callback) {
  let res = reg.exec(this)
  while (res) {
    callback(...res) // 捕获一次执行一次回调函数，并且把通过exec捕获的数组展开，每一项都一次传递给回调函数(returnV:当前函数执行的返回结果，我们
    // 要拿这个结果替换成字符串中当前大正则匹配的内容)
    let returnV = callback(...res)

    let v = res[0],
      i = res.indexOf(v)
    _this = _this.substring(0, i) + returnV + _this.substring(v.length + i)
    res = reg.exec(this)
  }
  return _this
}