####运行机制
代码自上而下执行
=>基本数据类型的值会存储在当前作用域下

```javascript
var a = 12;
```

1. 首先开辟一个内存空间储存 12
2. 在当前作用域中声明一个变量 a
3. 让声明的变量和储存的 12 进行关联

基本数据类型（也叫值类型），是按照值来操作的:吧原有的值复制一份，放到新的空间或位置上，和原来的值没有关系

引用类型数据的值不能直接储存到当前作用域下（因为可能储存的内容过于复杂），我们需要先开辟一个新的空间（理解为仓库），把内容存储到这个空间中

```javascript
var obj1 = { n: 100 };
```

1)首先开辟一个新的内存空间，把对象中的键值对依次储存起来（为了保证后面可以找到这个空间，此空间有一个 16 进制的地址）
2）声明一个变量
3）让变量和空间地址关联在一起（把空间地址复制给变量）

#####栈内存
本身就是提供 JS 代码执行的环境
所有的基本类型都会直接在栈内存中开辟一个位置进行储存

#####堆内存
用来存储引用类型中的信息值的空间
对象存储的是键值对
函数存储的是代码字符串

```javascript
var obj = {
  n: 10,
  m: obj.n * 10
};
console.log(obj.m);
```

####思考，上述代码运行结果是什么？为什么？
运行结果：
TypeError: Cannot read property 'n' of undefined
解答：
JavaScript 在运行代码时会先形成一个全局作用域（栈内存）
代码由上而下执行
首先开辟一个新的堆内存（AAFF1111）,把键值对存储到对内存中

```javascript
  n: 10,
  m: obj * 10
   //此时，堆内存信息还没有存储完成，空间地址还没有给obj,
   //此时obj就是undefined，而undefined是基本类型，基本类型是没有属性值的，所以会报错
```

###js 中的判断操作语句
1、if/else

```javascript
var num = 12;
if (num > 10) {
  num++;
} else if (num >= 0 && num <= 10) {
  num--;
} else {
  num += 2;
}
```

###三目运算符

```
condition ？ statements ：statements
```

如果要执行多条语句，此时用小括号包裹起来，并用逗号分隔即可

###函数

> 在 JS 中，函数就是一个方法，基于函数一般都是为了实现某个功能

\*\*函数诞生的目的就是为了封装：把实现一个功能的代码封装到到一个函数中忙早起想要实现这个功能，只需要把函数执行即可，不必要再次编写重复的代码，起到了低耦合高内聚的作用

=====
ES6 标准中创建箭头函数
let 函数名(变量名) =（[参数]） => {
函数体
}

函数作为引用类型中的一种，他也是按照引用地址来操作的
\*\*\*函数的储存，
函数被创建后，会在堆内存中开辟一个内存空间，把函数里面的语句以’字符串‘的形式储存在其中，然后把储存这个空间的地址赋值给函数名

\*\*\*函数的助兴
目的：把之前存储到堆内存中的代码字符串变为真正的 JS 代码自上而下执行，从而实现应有的功能

1.函数执行，首先会形成一个私有的作用域（一个代码执行的环境，也是一个栈内存） 2.吧之前在堆内存中存储的字符串复制一份过来，变为真正的 JS 代码，在新开辟的作用域中自上而下执行

\*\*\*函数的参数

> 参数是函数的入口：当我们在函数中封装一个功能，发现一些原材料不确定，需要执行函数的时候用户传递进来才可以，此时我们就基于参数的机制，提供出入口即可

```javascript
```

### 2019.02.24 JS 中的数据转换

JS 中的数据类型分为
【基本数据类型】
数字 number
字符串 string
空 null
未定义 undefined

【引用数据类型】
对象 object
普通对象
数组对象
正则对象
日期对象
数学函数
。。。
函数

真是项目中，根据需求，我们往往需要把数据类型之间进行转换

### 把其他类型数据类型转换为 number 类型

`1.发生情的情况`
-isNaN 检测的时候：当检测的值不是数字类型，浏览器会自动调用 number 方法把他先转换为数字，然后再检测是否为有效数字

```javascript
  isNaN('3') => false
  Number('3') => 3
  isNaN(3) => false

```

- 基于 parseInt/parseFloat/Number 手动转换为数字类型
- 数学运算：+ - \* 、 % ，但是’+‘ 不仅仅是数学运算符，还坑是字符串拼接

```javascript
  '3' - 1 => 2
  Number('3') => 3
  3 - 1 => 2

  '3px' - 1 => NaN

  '3px' + 1 => '3px1' => 字符串拼接

  var i = '3'
  i = i + 1 => '31'
  i += 1 => '31'
  i++ => 4 i++ 就是单纯的数学运算，已经摈弃掉字符串拼接规则
```

- 在基于"=="比较的时候，有时候也会把其他值转换为数字类型
- ...

`2.转换规律`

```javascript
    // 转换方法 Number（浏览器自行转换的都是基于这个方法）

    【把字符串转换为数字】
    只要遇到一个非有效数字字符，结果就是NaN
    '0' => 0
    ' ' => 0
    '\n' => 0
    '\t' => 0

    【把布尔类型转换为数字】
    true => 1
    false => 0

    【把没有转换为数字】
    null => 0
    undefined => NaN //#endregion

    【把引用类型转换为数字】
    首先都县转换为字符串，然后再转换为数字
```

### 把其他类型值转换为字符串

`1.发生的情况`

- 基于 alert/confirm 等方法输出内容的时候，会把里面的内容转换为字符串再输出
- 基于 "+"进行字符串拼接的时候
- 吧引用类型值转换为数字的时候，首先会转换为字符串，然后再转换为数字
- 给对象设置属性名，如果不是字符串，首先转换为字符串，然后再当做属性储存到对象中（对象的属性只能是数字或者字符串）
- 手动调用 toString/toFixed/join/String 等方法的时候

#### 转换规律

- 引用类型基本都是调用 toString 方法
- 基本类型基本都是直接转换为字符串
- 【对象】
- => 不管是怎样的普通对象 转换结果都为 '[object object]'

### 把其他类型转换为布尔类型

`1.发生的情况`

- 基于 !/!!/Boolean 等方法转换
- 基于条件判断的条件最后都会转换为布尔类型

`2.转换的规律`
只有"0/NaN/''/null/undefined 五个值转换为布尔的 false，其余都是转换为 true

### 特殊情况：数学运算和字符串拼接‘+’

- 当表达式中出现字符串，就是字符串拼接，否则就是数学运算

### js 数组常用方法的剖析

- 数组也是对象数据类型，也是有键值对组成的

```javascript
   var ary = [12,23,34]
  /*
   * 结构
   * 0: 12
   * 1: 23
   * 2: 24
   * length: 3
   */
   1. 以数组作为索引(属性名)，索引从零开始递增
   2. 有一个length属性存储的是数组的长度
```

数组中每一项的值可以是任何类型的

```javascript
var ary = [
  {
    name: "xxx",
    age: 20
  },
  {
    name: "aaa",
    age: "20"
  }
];
```

### 数组中的常用方法

> 按照四个维度记忆: -方法的作用 -方法的参数 -方法的返回值 -原有数组是否改变

**`push`**
作用：向数组末尾追加新的内容
参数：追加的内容（一个或多个）
返回值：新增后数组的长度
原有数组改变

**`pop`**
作用：删除数组中最后一项
参数：无
返回值: 被删除项的值
原有数组改变

**`shift`**
作用:删除数组中的第一项
参数：无
返回:被删除那一项的内容
原有数组改变

**`unshift`**
作用:在数组开始位置追加新的内容
参数：要增加的内容
返回:增加内容后数组的长度
原有数组改变

**`splice`**
作用:基于 splice 可以堆数组矩形很多的操作:删除指定位置的内容，向数组指定位置增加内容，修改指定位置的信息
参数：要增加的内容
返回:增加内容后数组的长度
原有数组改变

**`slice`**
作用:在一个数组中，按条件找出其中的部分内容
参数:(m/n)
返回:一个新数组储存所茶盅的内容
原有数组不变

**`concat`**
作用:拼接多个数组
参数：数组或者新值
返回:新数组的
原有数组不变

**`sort`**
作用:给数组进行排序
参数：无/ 函数
返回:排序后的数组
注意:在不传递参数的情况下，只能处理 10 以内数字的排序
原有数组改变

**`indexOf / lastIndexOf`**
注:这两个方法不兼容低版本浏览器(IE6-8)
作用:检测当前值在数组中第一次或者最后一次出现位置的索引
参数：值
返回:存在则返回索引，不存在则返回-1
原有数组不变

2019.03.01

### URL 地址问好传参解析

> 有一个 URL 地址“http://www.zhihu.com/question/?lx=1&name=AA&SEX=man”问好后面的内容是需要解析出来的参数信息

```javascript
  {
    lx:1,
    name:'AA',
    sex:'man'
  }

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

var str = 'http://www.zhihu.com/question/?lx=1&name=AA&SEX=man' // 后面的称为哈希值
var hashPos = str.indexOf('#')
var questionMarkPos = str.indexOf('?')
var obj = {}
if (hashPos < 0) {
  str = str.slice(questionMarkPos+1)
} else {
  str = str.slice(questionMarkPos+1, hashPos)
}
var arr = str.split('&')
for (var i = 0; i < arr.length; i++) {
  var item = arr[i].split('=')
  var key = item[0]
  var value = item[1]
  obj[key] = value
}
```

### JS 中的数学函数 Math

Math 成为数学函数，但是他属于对象类型

```javascript
  typeof Math => "object"
```

之所以叫做数学函数，是因为 Math 这个对象提供了很多操作数字的方法

### Math 中提供的常用方法

**`abs`**
作用:取绝对值

**`ceil/floor`**
作用:向下/向上取整

```javascript
Math.ceil(10.01); // => 11
Math.floor(10.999); // => 10
```

**`round`**
作用：四舍五入取整

**`sqrt`**
作用:开平方

**`pow`**
作用：取幂

**`max/min`**
作用:获取最大/最小值

**`random`**
作用：获取 0~1 之间的随机数

**`Math.round(Math.random() * (m-n) + n)`**
作用：获取 n-m 之间的随机数

### 函数复习

```
 函数执行的时候，都会形成一个全新的私有作用域（私有的栈内存），目的是：
1.把原有堆内存中存储的字符串变为 JS 表达式执行
2.保护里面的私有变量不瘦外界的干扰（和外界是隔离的）
 我们把函数执行的这种保护机制称为‘闭包’
```

### DOM 树

> dom tree
> 当浏览器加载 HTML 页面的时候，首先就是 DOM 结构的计算，计算出来的 DOM 结构就是 DOM 树（把页面中的 HTML 标签像树状结构一样，分析出之间的层级关系）

DOM 树描述了节点间的关系，我们只要知道任何一个标签，都可以依据 DOM 中提供的属性和方法，获取到页面中任意一个标签或者节点

###JS 中获取 DOM 元素的方法
**`getElementById`**
1.getElementById 的上下文只能是 document

> 因为在严格意义上，一个页面中的 ID 是不能重复的，浏览器规定在整个文档中只可以获取这个唯一的 ID

2.如果页面 ID 重复了，我们基于这个方法只能获取到第一个元素，后面相同 ID 元素无法获取

3.在 IE6-IE7 浏览器中，表单元素的 name 属性会被当成 ID 属性来使用（使用表单元素时，不要让 name 和 id 的值有冲突）

**`getELementsByTagName`**
`[context].getElementsByTagName`
在指定的上下文中，根据标签名获取一组元素集合（HTMLCollection） 1.获取的元素是一个类数组，不能直接使用数组方法 2.它会把当前上下文中，子子孙孙（后代）层级内的标签都获取到 3.基于这个方法获取到的结果永远是一个集合，操作具体的某一项，需要基于索引获取才可以

**`getElementsByClassName`**
`[context].getElementsByClassName`在指定上下文中，基于元素的样式类名获取到一组元素集合 1.在真实项目中，我们经常是基于样式类来给元素设置样式，所以在 JS 中，我们也经常基于样式来获取元素，但此方法在 IE6-8 中不兼容
兼容处理方案参考：

```javascript
Node.prototype.queryElementsByClassName = function queryElementsByClassName() {
  if (arguments.length === 0) return [];
  var strClass = arguments[0],
    nodeList = utils.toArray(this.getElementsByTagName("*"));
  strClass = strClass.replace(/^ +| +$/g, "").split(/ +/);
  for (var i = 0; i < strClass.length; i++) {
    var reg = new RegExp("(^| +)" + strClass[i] + "( +|$)");
    for (var k = 0; k < nodeList.length; k++) {
      if (!reg.test(nodeList[k].className)) {
        nodeList.splice(k, 1);
        k--;
      }
    }
  }
  return nodeList;
};
```

**`getElementsByName`** 1.上下文只能是 document，在整个文档中，基于元素 name 属性获取一组节点集合 2.在 IE 浏览器中（IE9 及以下版本），只对表单元素的 name 属性器作用，（正常来说，我们项目中只会给表单元素设置 name，给非表单元素设置 name 其实是一个不太符合规范的操作）

**`querySelecotr`**
`[context].querySelector()` 在指定上下文中，基于选择器（类似 CSS 选择器）获取到指定的元素对象，（获取的是一个元素，哪怕选择器匹配了多个，也只获取到第一个）

**`querySelecotrAll`**

> 在 querySelector 的基础上，获取到选择器匹配的所有元素，结果一一个节点集合（nodeList）

1. querySelecotrAll/querySelecotr 都是不兼容 IE6-8（在不考虑兼容的情况下，我们能用 byId 或者其他方法获取的，也尽量不要用这两个方法，这两个方法性能消耗较大）

**`document.head`**
获取 HEAD 元素对象
**`document.body`**
获取 BODY 元素对象
**`document.documentElement`**
获取 HTML 元素对象

```javascript
// => 需求：获取浏览器一屏幕宽度和高度（兼容所有的浏览器）
document.documentElement.clientWidth || document.body.clientWidth;

document.documentElement.clientHeight || document.body.clientHeight;
```
