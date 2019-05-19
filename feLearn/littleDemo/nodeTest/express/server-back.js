let express = require('express'),
  app = express(),
  port = 8686,
  bodyParser = require('body-parser'),
  session = require('express-session')

app.listen(port, () => {
  console.log('hello world');
})

//=> Bodyparser:如果是post/put请求，会把基于请求主体传递的信息预先截获
// 如果传递的是json格式的字符串，基于bodyparser.json()会把他转换为json格式的对象
// 如果传递的是url-encoded格式个字符串,会基于body-parser.urlencoded()会把他转换为对象键值对的方式
// 把转换后的结果挂载到req.body属性上
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// express-session 这个中间件是供我们后续操作session的，基于这个中间件，我们可以设置客户端cookie的过期时间（也理解为session在服务器端存储的时间），当
// 中间件执行完成后，会在req上挂载一个session属性，用来操作session
app.use(session({
  secret: 'fjf',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}))
app.post('/register', (req, res) => {
  // get请求，接收问号传参的信息，可以使用req.query 、req.parm（）
  // POST请求，接收请求主体传递的信息，此时需要使用中间件body-parser
});


/* app.use(express.static('./static'));
app.use('/user', (req, res, next) => {
  // => 请求的path中是以‘/xxx’开头的，例如：‘/user’ '/user/id'
  next()  //=> 不执行next是无法走到下一个中间件或者请求中的（next就是执行下一个的意思，可能是下一个中间件，也可能是下一个请求）
})
app.use((req, res, next) => {
  // =>所有的请求都会走这个中间件，而且中间件执行的顺序是按照书写的先后顺序执行
}); */



/**
* 当客户端向服务器发送请求，如果请求方式是get，请求路径是‘/getUser’,就会把回调函数触发执行，里面有三个参数，req,res,next
* req:request (它不是原生node中的req,),它是express框架封装处理的，但是也存储了还多客户端传递给服务器的信息的对象
*  req.params 存储的是路径参数信息
*  req.path 请求的路径名称
*  req.query 请求的问号传参信息（get请求对这样传递的信息）（对象）
*  req.body 请求的方式是POST，我们基于bodyparser中间件处理后，会把客户端请求主体中传递的内容存放的body属性上
*  req.session 当我们基于express-session中间件处理后，会把session操作放到这个属性上，基于这个属性可以操作session信息
*  req.cookie 当我们基于cookie-parser中间件处理后，会把客户端传递的cookie信息存放到这个属性上
*  req.get() 获取指定的请求头信息
*  req.param（） 基于这个方法可以把url-encoded格式字符串（或者路径参数）中的某一个属性名对应的信息获取到
*
* res:response 也不是原生node中的res,也是经过express封装处理的，目的是为了提供一些属性和方法，可以供服务器端调取使用
*/


