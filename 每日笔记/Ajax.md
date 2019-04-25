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
   所有的请求都可以个服务器端传递内容，也可以从服务器端获取内容
   GET:从服务器端获取数据(给得少拿的多)
   POST:向服务器端推送数据(给的多拿的少)
   DELETE:删除服务器端的某些内容
   PUT:向服务器上存放一些内容(一般是文件)
   HEAD:只想获取服务器返回的响应头信息，不要响应主体中的内容
   OPTIONS:一般使用它向服务器发送一个探测性请求，如果服务器端返回了信息，说明当前客户端和服务器端建立了连接，我们可以继续执行其他请求了
