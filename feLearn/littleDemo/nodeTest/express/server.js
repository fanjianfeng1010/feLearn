let express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session')

let { readFile, writeFile } = require('./utils/fsPromise'),
  pathDataUSER = './json/USER.JSON',
  pathDataVOTE = './json/VOTE.JSON',
  port = 8686,
  app = express()

// 创建服务
app.listen(port, () => {
  console.log(`app is listen on ${port}`);
});

// => 处理api
app.use(session({
  secret: 'fjf',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(async (req, res, next) => {
  //获取JSON里面的数据
  let userData = await readFile(pathDataUSER)
  let voteData = await readFile(pathDataVOTE)
  req.userData = JSON.parse(userData)
  req.voteData = JSON.parse(voteData)
  next()
})

// => 登录
app.post('/login', (req, res) => {
  // => req.body 请求主体传递的内容（对象）
  let { name = '', password = '' } = req.body
  console.log();
  password = password.substr(4, 24).split('').reverse().join('') // => 二次加密
  // 验证用户是否存在
  let result = req.userData.find(item => (item['name'] === name || item['phone'] === name) && item['password'] === password);
  if (result) {
    // 登录成功:记录session(是否登录&登录用户的ID)
    req.session.isLogin = true
    req.session.userID = parseFloat(result['id'])
    res.send({ code: 0, message: 'OK' });
    return
  }
  res.send({ code: 1, message: 'NO' });
})

// => 检测是否登录
app.get('/checkLogin', (req, res) => {
  let isLogin = req.session.isLogin
  if (isLogin) {
    res.send({ code: 1, message: 'OK' })
    return
  }
  res.send({ code: 0, message: 'NO' })
})

// =>退出登录
app.get('/exitLogin', (req, res) => {
  req.session.isLogin = false
  req.session.userID = null
  res.send({ code: 0, message: 'OK' });
})

// => 获取用户信息，没有传递用户ID，获取当前登录用户的信息
app.get('/getUser', (req, res) => {
  let { userID = req.session.userID } = req.query,
    result = req.userData.find(item => item['id'] === parseFloat(userID))
  if (result) {
    res.send({ code: 0, message: 'OK', data: { ...result, password: null } })
    return
  }
  res.send({ code: 1, message: 'NO', data: null })
})


// => 处理静态资源请求
app.use(express.static('./static'))
app.use((req, res, next) => {
  res.status(404)
  res.redirect('/404.html')
});



