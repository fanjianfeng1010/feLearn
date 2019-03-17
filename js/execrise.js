// if ('m' in window) {
//   var m = m && 12
// }
// console.log(m)

/**  => undefined 使用var 声明的变量，在条件判断语句中，无论条件是否成立，都会变量提升
 * 在全局作用域中基于var 声明的变量，相当于给window设置了一个属性，所以条件成立，而 m && 12 的结果为 左假右真，返回左边
 */

// let n = 10
// if (!('n' in window)) {
//   let n = n + 30
// }
// console.log(n)
/**
 * 报错，
 * 使用let 声明的变量没有变量提升，在全局作用域中也不会为window设置属性，所以条件判断语句成立，
 * 但是在条件判断语句中声明的变量是块级作用域，在条件判断语句重新声明了n，则与全局作用域下的n的联系断开了，
 * 而赋值语句的操作是先准备值，再声明变量，之后才给变量赋值（n 是基于ES6声明的变量，在块级作用域中n还没声明就被使用了
 * 所以会报错）
 *  */

// let n = 10,
//   m = 20

//   ~ function (n, m) {
//     let arg = arguments
//     arg[0] = n || 100
//     arg[1] = m || 200
//     console.log(n, m)
//     // 第一步：全局作用域中变量声明，此法分析，let n = 10, m = 20,
//     // 第二步，代码自上而下执行，进入自执行函数中，
//     //   没有变量声明，形参赋值，此时传入了全局作用域下m的值 10，自执行函数只定义了一个参数，所以此时私有作用域中
//     //   arguments[0]的值是n => 10, 则 n||100条件成立，arg[0] => 10, m||200 条件也成立，arg[1] => 10
//     // 此时在局部作用域中输出arg[0] => n => m => 10, arg[1] => 20
//   }(m)
// console.log(n, m)

let ary = [12, 23, 34, 45];
(function (ary) {
  ary.pop()
  ary = ary.slice(0)
  ary.shift()
  console.log(ary) // => [23,34] 
})(ary)
console.log(ary) // => [12,23,34]


let i = 0
let fn = function (n) {
  i += 2
  return function (m) {
    i += (++n) + (m--)
    console.log(i)
  }
}
let f = fn(2)
f(3) //=> 2 + 3 +3
fn(2)(3) // 8+ 2 + 3 + 3
f(4) // 16 + 4 + 4
console.log(i)


var n = 0
var fn = function () {
  this.n *= 2
  n++
  return function (m) {
    n += ++m
    console.log(n)
  }
}
var f = fn(2) // 
f(3) // 1 + 4
fn(3)(4) // 11 + 5
f(4) // 17 + 4
console.log(n) // 17

let i = 2
let fn = function (n) {
  i *= 2
  return function (m) {
    i -= (n--) + (++m)
    console.log(i)
  }
}
let f = fn(1)
f(2)
fn(3)(4)
f(5)

/**
 * 全局作用域中
 *  词法分析，变量声明,代码自上而下执行
 *  let i = 2, let fn = "AAAFFF111"
 *  let f = fn(1) => AA的私有作用域中
 *    AA
 *      词法分析，形参赋值，n = 1
 *      i *= 2,AA中没有i的声明，向上级作用域查找 => i = 4(全局i)
 *      返回匿名函数的地址"BBBFFF111"
 *      由于有外部变量的引用，AA私有作用域不销毁
 *  f(2) => 私有作用域 BB形成
 *    BB
 *      词法分析，形参赋值 => m = 2,
 *      代码自上而下执行
 *        i -= (n--) + (++m)
 *          函数体中没有变量i的声明，向上级作用域查找，找到i*=2,没具体值，继续往上查找，全局中找到变量i，i = 4
 *          函数体中没有变量n的声明，向上级作用域查找，找到形参n,由于AA行程的私有作用域没销毁，n = 1, 由于--是后缀的，所以运算时 n的值不变，为 1
 *          函数体中有形参m，值为2，由于是前缀++,先++再进行运算，即 m = 3
 *          => i = i - (1+3) =>  4 - 4 => 0
 *          最后执行后，i = 0(全局); n = 0（AA）, m = 3,私有作用域BB销毁
 *   fn(3)(4) => 行程私有作用域 CC
 *      CC
 *        词法分析，形参赋值 => n = 3
 *        代码自上而下执行
 *          i*=2 => 全局 i = 0 => i = 0
 *          返回匿名函数执行 => 在cc中形成私有作用域 DD
 *            DD
 *              词法分析，形参赋值 => m = 4
 *              代码自上而下执行
 *                i -=(n--) + (++m)
 *                  全局 i = 0 上级作用域CC n = 3 形参 m = 4
 *                  => i = i - (3 + 5) => i = -8 
 *                  私有作用域DD销毁
 *            私有作用域CC销毁
 *    f(5)
 *      形成私有作用域 EE
 *        形参赋值，m = 5
 *        代码自上而下执行
 *          i -= (n--) + (++m)
 *            全局i => 8
 *            上级n位于私有作用域AA中，n = 0
 *            形参 m = 5
 *            => i = i-(0 + 6) => -8 - 6 => -14
 *            
 * 
 *    
 *    
 * */

let n = 10
let obj = {
  n: 20
}
let fn = obj.fn = (function () {
  this.n++
  n++
  return function (m) {
    n += 10 + (++m)
    this.n += n
    console.log(n)
  }
})(obj.n)
fn(10)
obj.fn(10)
console.log(n, obj.n)
/**
 * 全局作用域中
 *    词法分析，声明变量， let n = 10,let obj = 'AAAFFF000' 
 *     let fn = obj.fn = 自执行函数的返回值 => 自执行函数形成的私有作用域（AA不销毁)
 *        私有作用域AA
 *          没有形参赋值，
 *          代码自上而下执行
 *            this.n++  => this => window.n++ => NaN
 *            n++ => 全局变量n => 11
 *            返回 'BBBFFF111' 地址
 *     fn(10)
 *      形成私有所用于 BB
 *      BB
 *        形参赋值 => m = 10
 *        代码自上而下执行
 *          n += 10 + (++m)  => n不是私有变量，向上级查找 => 全局中：n = 11
 *          n = 11 + 10 + +11 => 32
 *     obj.fn(10)
 *      形成私有作用域 CC
 *        CC
 *          形参赋值 => m = 10
 *          代码自上而下执行
 *            n += 10 + (++m) => n不是私有变量，向上级查找 => 全局中: n = 32
 *            n = 32 + 10 + 11 => 53
 *            this.n += n => this =>obj => obj.n = 20 + 53
 */


let n = 1
let x = {
  n: 2,
  y: (function (n) {
    n = n || 3
    return function (m) {
      m = m || 4
      this.n += m++
      n += ++m
      console.log(n)
    }
  })(window.n)
}
let z = x.y
x.y(5)
z(6)
console.log(n, x.n)

/**
 * 全局作用域中 词法分析，代码自上而下执行
 *  let n = 1
 *  let x = 'AAAFFF000'
 *  let z = x.y
 *    形成私有作用域 AA
 *      AA 
 *        形参赋值 => window.n => undefinded
 *          代码自上而下执行
 *            n = undefined || 3 => n = 3
 *            返回 ‘BBBFFF000’
 *            私有作用域AA不销毁
 *  x.y(5) => 形成私有作用域BB
 *    形参赋值 m = 5
 *      代码自上而下执行
 *        m = 5 || 4  => m = 5
 *        this.n += m++  => this => obj => this.n = 2 + 5 => obj.n = 7  执行后 m = 6
 *        n += ++ m => n在私有作用域BB中不存在，向上级作用域查找 => n = 3
 *          => n = 3 + (++6)  => 10
 *        console.log(n)  => 输出10
 *        执行结束，私有作用域BB销毁
 * z(6) => 形成私有作用域 CC
 *    形参赋值 m = 6
 *    代码自上而下执行
 *      m = 6 || 4 => m = 6
 *      this.n += m++ => this => window => NaN， 执行后 m = 7
 *      n += ++m => n在私有作用域CC中不存在，向上级作用域查找 => 10
 *        => n = 10 + (++7) => 18
 *      console.log(n) => 18
 *      执行结束，私有作用域CC销毁
 * console.log(n,obj.n)  => n = 1, obj.n = 7 
 *  
 * 
 */