### Ajax

- async JavaScript and XML
  在 Ajax 中的异步不是我们理解的同步异步编程，而是泛指“局部刷新”，但是我们在以后的 Ajax 请求中尽可能使用异步获取数据(因为异步获取数据不会阻塞代码的执行)

创建 Ajax 实例:IE6 是不兼容的，使用的是 new ActionObject 来实现的

- 1. 打开请求:发送请求之前的一些配置项
     HTTP METHOD 请求方式
     GET/ DELETE /HEAD /OPTIONS/TRACE/CONNECT/PUT/POST
- 2. URL 向服务器端发送请求的 api（application programming interface） 接口地址
- 3. async 设置 Ajax 请求的同步异步，默认是异步（写 true 也是异步），false 是同步，项目中都使用异步编程，防止阻塞后续代码执行
- 4. user-name/user-pass:用户名密码，一般不用

```javascript
xhr.open(method, url, async, user - name, user - pass);
```

3. 事件监听:一般监听的都是 ready-state-change 事件(Ajax 状态改变事件)，基于这个事件可以获取服务器返回的响应头/主体等内容

```javascript
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    xhr.responseText;
  }
};
```

4. 发送 Ajax 请求:从这部开始，当前 Ajax 任务开始，如果 Ajax 是同步的，后续代码不会执行，要等到 Ajax 状态成功之后再执行，反之异步不会

```javascript
xhr.send([请求主体内容]);
```

3. 关于 HTTP 请求方式的一点学习
   所有的请求都可以给服务器端传递内容，也可以从服务器端获取内容
   GET:从服务器端获取数据(给得少拿的多)
   POST:向服务器端推送数据(给的多拿的少)
   DELETE:删除服务器端的某些内容
   PUT:向服务器上存放一些内容(一般是文件)
   HEAD:只想获取服务器返回的响应头信息，不要响应主体中的内容
   OPTIONS:一般使用它向服务器发送一个探测性请求，如果服务器端返回了信息，说明当前客户端和服务器端建立了连接，我们可以继续执行其他请求了

4. GET 和 POST
   [传递给服务器信息的方式不一样]
   GET 是基于 URL 地址“问号传参”的方式把信息传递给服务器
   POST 是基于“请求主体把信息传递给服务器的”

   ```javascript
   // [GET]
   xhr.open("GET", "asdfa/dsa/list?xxx=xxx");

   // [POST]
   xhr.send("xxx=xxx&xx=xxx");
   ```

   GET 一般用于拿(给服务器的会少一点)，而 POST 会给服务器多一点，如果 POST 是基于问好传参方式实现会出现一些问题：URL 会拼接很长，浏览器对 URL 的长度有最大限制
   （谷歌 8kb,火狐 7kb,IE2kb）,超过的部分浏览器会把它截取了，所以 GET 请求可以基于 URL 传参，而 POST 都是使用主体传递的(请求主体李乱世是没有限制的，真实项目中我们会自己做大小限制，防止上传过大信息导致请求迟迟不完成)

   [GET 不安全，POST 相对安全]
   因为 GET 是基于“问号传参”把信息传递给服务器的，容易被骇客进行 URL 劫持，POST 是基于请求主体传递的，相对来说不好被劫持，所以登录注册等涉及安全性的交互操作，我们都应该使用 POST 请求；

   [GET 请求会产生不可控制的缓存，POST 不会]
   不可控:不是想要就要，不想要就不要的，这是基于浏览器自主记忆的缓存，我们无法基于 JS 控制，真实项目中我们都会把这个缓存干掉
   GET 请求产生缓存是因为：连续多次向相同的地址(并且传递的参数信息也是相同的)发送请求，浏览器会把之前获取的数据从缓存中拿到返回，导致无法获取服务器最新的数据(POST 不会)

   解决方案

   ```javascript
   xhr.open("GET", "/temp/list?lx=1000&_=${Math.random()}");
   // => 宝宝每次请求的地址不完全一直：在每一次请求的末尾追加一个随机数即可(使用_昨晚属性名就是不想和其他的属性名冲突)
   ```

5. AJAX 状态 readystate
   0:UNSENT 刚开始创建 xhr，还没有发送
   1:OPENED 以及执行了 open 这个操作
   2:HEADERS_RECEIVED 已经发送 AJAX 请求（AJAX 任务开始），响应头信息已经被客户端接收了（响应头中包含了：服务器时间、返回的 HTTP 状态码）
   3:LOADING 响应主体任荣正在返回
   4:DONE 响应主体内容已经被客户端接收

6. HTTP 网络状态码 status
   根据状态码能够清楚的反映出当前交互的结果及原因
   1xx 信息，服务器收到请求，需要请求者继续执行操作
   2xx 成功，操作被成功接收并处理

   - 200 OK 请求成功。一般用于 GET 与 POST 请求，只能证明已经成功，但是请求的资源不一定是你想要的

   3xx 重定向，需要进一步的操作以完成请求

   - 301 Moved Permanently 永久移动。请求的资源已被永久的移动到新 URI，返回信息会包括新的 URI，浏览器会自动定向到新 URI。今后任何新的请求都应使用新的 URI 代替
   - 302 Found 临时移动。与 301 类似。但资源只是临时被移动。客户端应继续使用原有 URI
     => 网站现在是基于 HTTPS 协议运作的，如果访问的是 HTTP，会基于 3-7 重定向到 HTTPS 协议上
     => 302 一般用于服务器负载均衡:当一台服务器达到最大并发数的时候，会把后续访问的用户临时转义到其他的服务器机组上处理
     => 偶尔真实项目中会把所有的图片放到单独的服务器上“图片处理服务器”，这样减少主服务器的压力，当用户向主服务器访问图片的时候，主服务器都会把它转移到图片处理服务器上处理

   - 304 Not Modified 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源
     =>对于不经常更新的资源文件,例如 css/js/html/img 等，服务器会结合客户端设置 304 缓存，第一次加载过这些资源就缓存到客户端了，下次再获取的时候，是从缓存中获取;如果资源更新了，服务器端会通过最后修改时间来强制客户端从服务器重新获取:基于 ctrl+f5 强制刷新页面，304 做的缓存就没有用了

   4xx 客户端错误，请求包含语法错误或无法完成请求;

   - 400 Bad Request 客户端请求的语法错误，服务器无法理解
   - 401 Unauthorized 请求要求用户的身份认证
   - 404 Not Found 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面
   - 413 Request Entity Too Large 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个 Retry-After 的响应信息

   5xx 服务器错误，服务器在处理请求的过程中发生了错误

   - 500 Internal Server Error 服务器内部错误，无法完成请求
   - 503 Service Unavailable 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的 Retry-After 头信息中

7. 关于 xhr 的属性和方法
   xhr.response 响应主体内容
   xhr.responseText 响应主体的内容是字符串(JSON 或者 XML 格式的都可以)
   xhr.responseXML 响应主体的内容是 XML 文档
   xhr.status HTTP 状态码
   xhr.statusText HTTTP 状态码的描述
   xhr.timeout 设置请求响应的超时时间
   xhr.withCredentials: false 是否语序跨域
   xhr.onabort() 强制中断 AJAX 请求
   xhr.getAllResponseHeaders: 获取所有响应头的信息
   xhr.getResponseHeader([key]) 获取 key 对应的响应头信息，例如：xhr.getResponseHeader('date')就是获取响应中的服务器时间
   xhr.open() 打开 URL 请求
   xhr.setRequestHeader 设置响应头

```javascript
let xhr = new XMLHttpRequest();
xhr.open("GET", "index.js", false); // false 同步
xhr.onreadystatechange = () => {
  /*   if (xhr.readyState === 4 && xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          console.log(data)
        } */
  if (xhr.readyState === 2) {
    console.log(1);
  }
  if (xhr.readyState === 4) {
    console.log(2);
  }
};
xhr.send();
console.log(3);
// 输出2 3 因为当AJAX任务开始，由于是同步编程，主任务对了在状态没有变成4（任务结束）之前一直被这监事占用着，其他事情都坐不了（当任务吧响应头返回的时候，状态为2
// 触发了时间，由于主任务对了没有完成，被占用着，绑定的方法也无法执行，所以只有状态为4的时候执行了一次这给方法）
```
