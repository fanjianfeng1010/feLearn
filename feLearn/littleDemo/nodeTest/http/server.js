let http = require('http'),
  path = require('path'),
  url = require('url'),
  fs = require('fs'),
  qs = require('qs')

let { readFile, writeFile } = require('./fsPromise'),
  mime = require('mime')

// => 公共方法
let responseResult = function responseResult(res, returnVal) {
  res.writeHead(200, {
    'content-type': 'application/json;charset=utf-8'
  })
  res.end(JSON.stringify(returnVal))
}

let readUSER = function readUSER() {
  return readFile('./json/USER.JSON').then(result => {
    return JSON.parse(result)
  })
}

let readVOTE = function readVOTE() {
  return readFile('./json/VOTE.JSON').then(result => {
    return JSON.parse(result)
  })
}
// 创建web服务
let port = 8088
const handle = (req, res) => {
  // => 客户端请求资源文件（path-name），服务器端都是到static文件夹中进行读取，也是根据客户端请求的路径名称读取的
  // 服务器端基于FS读取文件中默认的时候，直接加上"./static"即可
  // console.log(req.headers['user-agent']);
  let { method, headers: requestHeaders } = req
  let { pathname, query } = url.parse(req.url, true)
  let pathREG = /\.([a-z0-9]+)$/i

  // =>静态资源文件请求处理
  if (pathREG.test(pathname)) {
    readFile(`./static${pathname}`).then(result => {
      //=> 读取成功:根据请求资源文件的类型，设置响应内容的mime
      let suffix = pathREG.exec(pathname)[1]
      res.writeHead(200, {
        'content-type': `${mime.getType(suffix)};charset=utf-8`
      })
      res.end(result)
    }).catch(error => {
      //=> 读取失败：最可能是由于文件不存在而读取失败（也就是客户端请求的地址是错误的，响应内容是404）
      res.writeHead(404, {
        'Content-type': 'text/plain;charset=utf-8'
      })
      res.end('NOT FOUND')
    })
    return
  }

  // => api请求处理
  // =>get-user 根据传递的用户ID获取指定的用户信息
  if (pathname === '/getUser' && method === 'GET') {
    console.log(pathname);
    // => 问号传递的信息都在query中存储着
    let { userId = 0 } = query,
      returnVal = { code: 1, message: 'no!', data: null }

    readUSER().then(result => {
      let data = result.filter(item => parseFloat(item['id']) === parseFloat(userId))
      if (data) {
        returnVal = { code: 0, message: 'ok', data }
        responseResult(res, returnVal)
        return
      }
      throw new Error('') //=> 目的是没有数据的时候，让其执行catch中的操作，这样我们只需要让then方法中有异常信息即可
    }).catch(error => responseResult(res, returnVal))
    return
  }

  // register: 注册用户
  /**
   * 1.接收客户端请求主体中传递的内容
   * 2.取得所有用户信息
   * 3.把获得的信息写入到存储用户信息的表中
   * 4.覆盖原有的信息表并写入文件
   */
  if (pathname === '/register' && method === 'POST') {
    // 接收客户端请求主体传递的内容
    let pass = ``
    req.on('data', chunk => {
      // => 正在接收请求主体内容，可能会被触发执行很多次,chunk获取的都是本次接收的buffer格式的数据
      pass += chunk
    })
    req.on('end', () => {
      // 已经把请求主体内容接收完成了,pass是一个urlencoded格式的字符串，我们需要把它解析成为对象 
      pass = qs.parse(pass)
      readUSER().then(result => {
        // => format-pass 
        let maxId = result.length <= 0 ? 0 : parseFloat(result[result.length - 1]['id'])
        pass.password = pass.password.substring(4, 24).split('').reverse().join('')
        let newData = {
          id: maxId + 1,
          name: '',
          picture: `img/${pass.sex != 0 ? `woman` : `man`}.png`,
          phone: pass.phone,
          sex: 0,
          password: '',
          bio: '',
          time: new Date().getTime(),
          isMatch: 0,
          matchId: "000",
          slogan: "",
          voteNum: 0,
          ...pass
        }

        // => 把newData 追加到result末尾,把最新的结果重新写入到文件
        result.push(newData)
        return writeFile('./json/USER.JSON', result)
      }).then(result => {
        responseResult(res, {
          code: 0,
          message: 'ok'
        })
      }).catch(error => {
        responseResult(res, {
          code: 1,
          message: 'no'
        })
      })
    })

    return
  }

  // => 请求的都不是以上接口，返回404
  res.writeHead(404)
  res.end('NOT FOUND')
}




http.createServer(handle).listen(port, () => {
  console.log(`sever is success, listen on ${port}`);
})