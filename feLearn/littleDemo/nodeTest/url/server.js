let http = require('http'),
  URL = require('url'),
  path = require('path'),
  fs = require('fs')

// 创建web服务

const handlHTTP = (req, res) => {
  let {
    url,
    method,
    headers
  } = req
  console.log(url, method, headers);
  let {
    pathname,
    query
  } = URL.parse(url, true)
  console.log(pathname, query);

  res.end('hello world and good bye')
}
let port = 8089
http.createServer(handlHTTP).listen(port, () => {
  console.log(`server is success,listen on ${port}`);
})
/* 
(req, res) => {
  //req:request 请求对象，包含了客户端请求的信息
  //res:response 响应对象，包含了一些属性和方法，可以让服务器端返回给客户端内容
  // => 当服务创建成功，并且客户端向当前服务器发送请求，才会执行回调函数，并且发送一次请求，回调函数就会被触发执行一次
  console.log(`hello word`)
} */