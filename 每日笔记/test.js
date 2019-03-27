const uniqueArray = ary => {
  let obj = {}
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    if (obj[item]) {
      ary[i] = ary[ary.length - 1]
      ary.length--
      i--
      continue
    }
    obj[item] = true
  }
  obj = null
  return ary
}

const uniqueArray = ary => {
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i]
    for (let j = i + 1; j < art.length; j++) {
      if (item === ary[j]) {
        ary[j] = ary[length - 1]
        ary.length--
        j--
      }
    }
    return ary;
  };
}

// 数组去重
const uniqueArray = ary => {
  let newAry = []
  ary = ary.sort((a, b) => a - b)
  console.log(ary)
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i],
      nextItem = ary[i + 1]
    if (item !== nextItem) {
      newAry.push(item)
    }
  }
  return newAry;
}
// 数组扁平化
let result = []
const deepAry = (ary) => {
  if (ary.length === 0) return
  for (let i = 0; i < ary.length; i++) {
    const element = ary[i]
    if (typeof ary[i] === 'object') {
      deepAry(element)
    } else {
      result.push(element)
    }
  }
  return result
}

// 向指定HTML元素后面插入元素
const insertAfter = (newEle, originEle) {
  // newELe：新插入的元素
  // originEle：指定的元素
  let praentNode = newEle.praentNode
  if (praentNode.lastChild === originEle) {
    praentNode.appendChild(newEle)
  } else {
    praentNode.insertBefore(newEle, originEle.nextSibling)
  }
}

let str = "珠峰培训zhufeng哈哈，javascript高级程序设计，good good study!",
  reg = /(?:(?:([a-zA-Z]+)([\u4e00-\u9fa5]+))|(?:([\u4e00-\u9fa5]+)([a-zA-Z]+)))/g;
str = str.replace(reg, (...arg) => {
  //=>REG和STR匹配几次，函数就被执行几次
  //=>ARG是数组，存储了每一次匹配捕获到的结果（包含分组捕获的结果）
  let [, oneVal, twoVal, threeVal, fourVal] = arg;

  if (oneVal && twoVal) {
    return ` ${oneVal} ${twoVal}`;
  }

  return `${threeVal} ${fourVal} `; //=>RETURN是啥就会把本次大正则匹配的字符替换成啥
});
console.log(str);

let str = "珠峰培训zhufeng哈哈，javascript高级程序设计，good good study!",
  reg = /.?([a-zA-Z]+).?/g;
str = str.replace(reg, (...arg) => {
  //=>每一次捕获的时候我们都把单词左右两边的一位捕获到，这样我们只需要判断捕获的内容中是否有汉字即可，有汉字加空格
  let reg = /[\u4e00-\u9fa5]/,
    [val, oneVal] = arg;
  if (reg.test(val)) {
    val = val.replace(oneVal, ` ${oneVal} `);
    return val;
  }
  return val;
});
console.log(str);


// 把英文段落中的首字母大写

let str = 'The-document method querySelector returns the first Element within the document that matches the specified selector, or group of selectors.'
let reg = /([a-zA-Z])([a-zA-Z]+)/g // 这样做有问题，以中杠连接的字母会被当成两个单词
str = str.replace(reg, (...arg) => {
  let [, fist, rest] = arg
  fist = fist.toUpperCase()
  return `${fist}${rest}`
})

let str = 'The-document method querySelector returns the first Element within the document that matches the specified selector, or group of selectors.'
let reg = /(?:^| )([^\s]+)(?: |$)/g
str = str.replace(/ /g, '  ').replace(reg, (...arg) => {
  return arg[1].substr(0, 1).toUpperCase() + arg[1].substr(1) + ' '
})


for (var i = 0; i < 5; i++) {
  setTimeout((function (i) {
    return function () {
      console.log(i)
    }
  })(i), 1000);
}

var a = {
  n: 4
}
var b = a
console.log(a)
b.x = a = {
  n: 10
}

console.log(a.x)
console.log(b.x)
console.log(a)

var fullName = 'language'
var obj = {
  fullName: 'javascript',
  prop: {
    getFullName: function () {
      return this.fullName
    }
  }
}

console.log(obj.prop.getFullName()) // undefined
var test = obj.prop.getFullName
console.log(fullName) // language



let a = 3,
  b = 4

function A(a) {
  A = function (b) {
    console.log(a + (--b))
  }
  console.log(++a)
}
A(5) // 6
A(6) // 11

window.val = 1
let json = {
  val: 10,
  dbl: function () {
    this.val *= 2
  }
}

json.dbl() // this:json => json.val = 20
let dbl = json.dbl
dbl() // this:window => window.val = 2
json.dbl.call(window) // this:window => window.val = 4
console.log(window.val, json.val) // 4 20

(function () {
  let val = 1
  let json = {
    val: 10,
    dbl: function () {
      val *= 2
    }
  }
  json.dbl()
  console.log(json.val + val) // 12
})()


let n = 2,
  fn = () => {
    this.n *= 3
    n++
    return m => console.log((++n) + m)
  }

var f = fn(4) // => n++: 全局n = 3
f(5) // => m:5 n:4
fn(4)(5) // n:6 m:5 => 11
f(6) // m:6 n:7 //13
console.log(n) //13


let Fn = function (x = 0, y = 0) {
  this.x = x
  this.y = y
  this.getX = function () {
    console.log(this.x)
  }
}

Fn.prototype.getX = function () {
  console.log(this.x)
}
let f1 = new Fn
Fn.prototype = {
  getY: function () {
    console.log(this.y)
  }
}
let f2 = new Fn(1, 2)
console.log(f1.constructor === f2.constructor) // false
f1.getX() // 0
//f1.getY() // 报错，isnot a function
f1.__proto__.getX() // undefined this:f1.__proto__
//f1.__proto__.getY() // 报错，isnot a function
f2.getX() // 1
f2.getY() // 2
//f2.__proto__.getX() // 报错，is not a function
f2.__proto__.getY() // undefined


let reg = /\d/g
let ary = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
let str = '4897128947239'
str = str.replace(reg, item => {
  return ary[item]
})

let str = 'hello<img src="haha.png" alt="哈哈"/>world'
// 输出 hello[哈哈]world
let reg = /<img.+alt=(?:"|')(.*)(?:"|')\/>/g

str = str.replace(reg, (...arg) => {
  return `[${arg[1]}]`
})


let str = 'hello<img src="haha.png" alt="哈哈"/>world<img src="xiee.png" alt="邪恶"/>'
let reg = /<img(?:[^<>]*alt="([\u4e00-\u9fa5]*)")\/>/g

str = str.replace(reg, (...arg) => {
  return `[${arg[1]}]`
})

let str = 'hello<img src="haha.png" alt="哈哈"/>world<img src="xiee.png" alt="邪恶"/>'

let reg = /<img([^<>]*)\/>/g

str = str.replace(reg, (...arg) => {
  let val = arg[1],
    regVal = /alt=("|')([\u4e00-\u9fa5]*)\1/,
    flag = regVal.test(val)
  if (flag) {
    val = regVal.exec(val)[2] || ''
    return `[${val}]`
  }
  return ''
})


let getParam = function (attr) {
  let str = 'localhost?name=aa&year=2019&me=fjf'
  let obj = {}
  let reg = /([^?&=#]+)=([^?&#]+)/g
  str.replace(reg, (...arg) => {
    let [, key, value] = arg
    obj[key] = value
  })
  return obj[attr]
}

let str = 'https://www.zhufengpeixun.com.cn:80/stu/index.html?name=xxx&age=19#teacher'
//let reg = /^([a-zA-Z]+:)\/\/$/


const getURLParm = (url) => {
  let link = document.createElement('a')
  link.href = str

  let {
    hash,
    hostname,
    port,
    pathname,
    protocol,
    search
  } = link
  if (!port) {
    switch (protocol) {
      case 'https':
        port = 443
        break
      case 'ftp':
        port = 21
        break
      default:
        port = 80
    }
  }
  let reg = /([^?=&]+)=([^?=&]+)/g
  let query = {}
  if (search) {
    search.replace(reg, (...arg) => {
      [, key, value] = arg
      query[key] = value
    })
  }
  let result = {
    hostname,
    port,
    pathname,
    search,
    query
  }
  return result
}

/**
 * 1）长度不能少于6位
 * 2）首字母必须是字幕
 * 3）合法字符只能是数字、字母、下划线
 */
let reg = /^[a-zA-Z]\w{5,}$/

// 获取字符串中出现次数最多的字符以及出现的次数

let str = 'zvhufasndjkfadjk134123jkhfjaksdf'
/**
 * 思路一
 *  获取字符串中的每一个字符，以对象键值对形式存储起来，属性名是字符，属性值是次数
 */
let obj = {}
let max = 0
str.replace(/./g, char => {
  if (obj.hasOwnProperty(char)) {
    obj[char]++
    if (obj[char] > max) {
      max = obj[char]
    }
    return
  }
  obj[char] = 1
})