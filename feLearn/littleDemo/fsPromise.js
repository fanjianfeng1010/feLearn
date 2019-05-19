let path = require('path'),
  fs = require('fs')

// 存储的是当前模块执行所在的绝对路径 !== __dirname
let dirname = path.resolve()

// => mkdir && rmdir && readdir && readFile && copyFile
;
['mkdir', 'rmdir', 'readdir', 'readFile', 'copyFile'].forEach(item => {
  exports[item] = function (pathName, copypath = '') {
    pathName = path.resolve(dirname, pathName)
    copypath = path.resolve(dirname, copypath)
    return new Promise((resolve, reject) => {
      let arg = [
        // 实质上这个数组保存的是一个函数
        (err, result) => {
          if (err) {
            reject(err)
            return
          }
          resolve(result || '')
        }
      ];
      item === 'readFile' ? arg.unshift('utf8') : null;
      item === 'copyFile' ? arg.unshift(copypath) : null;
      fs[item](pathName, ...arg)
    })
  }
})

;
['writeFile', 'appendFile'].forEach(item => {
  exports[item] = function (pathName, content) {
    pathName = path.resolve(dirname, pathName)
    if (typeof content !== 'string') {
      // => 写入的内容必须是字符串才可以
      content = JSON.stringify(content)
    }
    return new Promise((resolve, reject) => {
      fs[item](pathName, content, 'utf8', (err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve(result || '')
      })
    })
  }
})

/* // readFile
exports.readFile = function (pathName) {
  pathName = path.resolve(dirname, pathName)
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, 'utf8', (error, result) => {
      if (error) {
        reject(error)
        return
      }
      resolve(result)
    })
  })
}
 */

/* const readFile = pathName => {
  // => 一般都会把传递进来的pathname进行处理：以当前项目的跟目录为依托，我们只需要传递相对于根目录的相对目录地址，程序自动生成一个绝对目录地址
  
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
} */