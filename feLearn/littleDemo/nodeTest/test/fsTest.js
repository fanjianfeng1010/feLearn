/* let path = require('path'),
  fs = require('fs')
const readFile = pathName => {
  // => 一般都会把传递进来的pathname进行处理：以当前项目的跟目录为依托，我们只需要传递相对于根目录的相对目录地址，程序自动生成一个绝对目录地址
  /**
   * __dirname:当前模块所在的绝对路径（和模块中的方法在哪里执行时没有关系的）
   * path.resolve():当前模块中方法在哪个模块中执行的，那么对于的绝对路径是执行模块的绝对路径
  
  pathName = path.resolve(path.resolve(), pathName)
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, 'UTF-8', (error, result) => {
      if (error) {
        reject(error)
        return
      }
      resolve(result)
    })
  })
}
module.exports = {
  readFile
} */

// 合并并且压缩css
let {
  readFile,
  writeFile,
  readdir
} = require('./fsPromise')

// 1.先把所有的CSS文件读取出来
readdir('less')
  .then(result => {
    return result.filter(item => /\.less/i.test(item))
  })
  .then(result => {
    let arg = [];
    result.forEach(item => {
      arg.push(readFile(`less/${item}`)) // 分别调取readFile方法，读取捕捉到的CSS文件，向数组中一次增加读取各个文件的promise实例
    })
    return Promise.all(arg)
  })
  .then(result => {
    result = result.join('')
    return result = result.replace(/ |\n|\r/g, '')
  })
  .then(result => {
    return writeFile('less/build.min.css', result)
  })
  .then(() => {
    console.log('创建成果');
  })