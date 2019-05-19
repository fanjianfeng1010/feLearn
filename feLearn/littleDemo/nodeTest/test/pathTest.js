let path = require('path')

// console.log(path.resolve()); // => 返回当前模块的绝对地址（不包含模块名称） /Users/fanjianfeng/codewars/feLearn/littleDemo/nodeTest

console.log(path.resolve(), __dirname) // /Users/fanjianfeng/codewars/feLearn/littleDemo/nodeTest/less
// => resolve() 第一个参数是绝对路径，第二个是相对路径，如果都是绝对路径，以最后一个为主