/**
 * 从URL字符串中找出参数并以对象保存
 * 
 * 1.首先需要找到问号，把问好后面的信息截取下来
 *  1.1 首先需要验证是否存在哈希值，存在则从问好截取到#，不存在则直接截取到字符串末尾
 * 2. 以& 进行拆分
 * 3. 遍历数组中的每一项，吧每一项再按照'='矩形拆分，吧ID反而后的第一项作为对象属性名，第二项作为属性值
 */
// var str = 'http://www.zhihu.com/question/?lx=1&name=AA&SEX=man' // 后面的称为哈希值
// 这个值可能有可能没有，我们需要处理，有点话截取时需要过滤
// var hashPos = str.indexOf('#')
// var questionMarkPos = str.indexOf('?')
// var obj = {}
// if (hashPos < 0) {
//   arr = str.substr(questionMarkPos).split('&')
//   for (var i = 0; i < arr.length; i++) {
//     var element = arr[i].split('=')
//     obj[element[0]] = element[1]
//   }
// }
// console.log(obj)

var str = 'http://www.zhihu.com/question/?lx=1&name=AA&SEX=man' // 后面的称为哈希值
var hashPos = str.indexOf('#')
var questionMarkPos = str.indexOf('?') + 1
var obj = {}
if (hashPos < 0) {
  str = str.slice(questionMarkPos)
} else {
  str = str.slice(questionMarkPos, hashPos)
}
var arr = str.split('&')
for (var i = 0; i < arr.length; i++) {
  var item = arr[i].split('=')
  var key = item[0]
  var value = item[1]
  obj[key] = value
}
console.log(obj)

提高眼界:
  7.
8.
9.
10.
11.
12.
13.
14.
15.
16.
17.
18.
19.
20.
21.
22.
23.
24.
25.
26.
27.
28.
29.
30.
31.
32.
var str = 'http://www.zhufengpeixun.cn/stu/?lx=1&n ame=AA&sex=man#teacher'; //=>#后面的称为哈希(HAS H)值,这个值可能有可能没有,我们需要处理,有的话我们截取的时候 需要过滤掉
//=>获取问号和井号在字符串中索引位置 var indexASK = str.indexOf('?'),
indexWell = str.indexOf('#'); //=>#可能有可能没有
if (indexWell > -1) {
  //=>存在井号,我们截取到井号的位置即可
  str = str.substring(indexASK + 1, indexWell);
} else {
  //=>没有井号,我们截取到末尾即可
  str = str.substr(indexASK + 1);
}
//=>str='lx=1&name=AA&sex=man'
var ary = str.split('&'), //=>["lx=1", "name=AA",
  "sex=man"]
for
obj = {};
(var i = 0; i < ary.length; i++) {
  var item = ary[i],
    itemAry = item.split('=');
  //console.log(itemAry);//=>["lx", "1"]  ["nam
  e ", "
  AA "] ...
  var key = itemAry[0],
    value = itemAry[1];
  obj[key] = value;
}
console.log(obj);

// 提高眼界的
~ function (pro) {
  pro.queryURLParameter = function () {
    var obj = {},
      reg = /([^?=&#]+)(?:=([^?=&#]+)?)/g;
    this.replace(reg, function () {
      var key = arguments[1],
        value = arguments[2] || null;
      obj[key] = value;
    });
    return obj;
  }
}(String.prototype);
var str = 'http://www.zhufengpeixun.cn/stu/?lx=1&n
ame = & sex = #teacher ';
console.log(str.queryURLParameter());