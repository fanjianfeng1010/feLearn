(function anonymous(window) {
  // => 设置默认的参数配置项
  let _default = {
    method: 'GET',
    url: '',
    baseURL: '',
    headers: {},
    dataType: 'JSON',
    data: null, // post系列请求基于抢救主体传递给服务器的内容
    params: null, // get系列请求基于问好传参传递给服务器的内容
    cahe: true
  };
  // 基于promise设计模式管理Ajax请求
  let ajaxPromise = function ajaxPromise(options) {
    // => options中融合了:默认信息，用户基于defaults修改的信息，用户执行get/post方法时候传递的配置信息，越靠后的优先级越高
    let {
      url,
      baseURL,
      method,
      data,
      dataType,
      headers,
      cache,
      params
    } = options

    // 把传递进来的参数进一步进行处理
    if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(method)) {
      // GET 系列请求
      if (params) {
        url += `${ajaxPromise.check(url)}${ajaxPromise.formatData(params)}`
      }
      if (cache === false) {
        url += `${ajaxPromise.check(url)}_=${+(new Date())}`
      }
      data = null // => GET系列请求主体就是什么都不放
    } else {
      // post系列请求
      if (data) {
        data = ajaxPromise.formatData(data)
      }
    }

    // => 基于promise发送Ajax请求
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest
      xhr.open(method, `${baseURL}${url}`)
      console.log('object :', method, url);
      // -> 如果headers存在，我们需要设置请求头
      if (headers !== null && typeof headers === 'object') {
        for (let attr in headers) {
          if (headers.hasOwnProperty(attr)) {
            let val = headers[attr]
            // \u4e00 - \u9fa5 中文字符范围，
            // 如果val中从头中文，我们要把它编码
            if (/[\u4e00-\u9fa5]/.test(val)) {
              val = encodeURIComponent(val)
            }
            xhr.setRequestHeader(attr, val)

          }
        }
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          console.log(xhr.readyState);
          if (/^(2|3)\d{2}$/.test(xhr.status)) {
            let result = xhr.responseText
            dataType = dataType.toUpperCase()
            dataType === 'JSON' ? result = JSON.parse(result) : (dataType === 'XML' ? result = xhr.responseXML : null)
            resolve(result);
            return
          }
          reject(xhr.statusText, xhr)
        }
      }
      xhr.send(data)
    })
  }

  // => 把默认配置暴露出去，后期用户在使用的时候可以自己设置一些基础的默认值(发送Ajax请求的时候按照用户配置的信息进行处理)
  ajaxPromise.defaults = _default

  // 把对象转换为urlencode格式字符串
  ajaxPromise.formatData = function formatData(obj) {
    let str = ``
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        let val = obj[attr];
        str += `${attr} = ${val}&`
      }
    }
    return str.substring(0, str.length - 1)
  }

  // 检查URL中是否包含?号
  ajaxPromise.check = function check(url) {
    return url.indexOf('?') > -1 ? '&' : '?'
  }

  //=>GET
  // let getMethod = ['get', 'delete', 'head', 'options']

  ;
  ['get', 'delete', 'head', 'options'].forEach(item => {
    ajaxPromise[item] = function anonymous(url, options = {}) {
      options = {
        ..._default, //=>默认值或者基于defaults修改的值
        ...options, //=>用户调取方法传递的配置项
        url: url, //=>请求的URL地址(第一个参数:默认配置项和传递的配置项中都不会出现URL，只能这样获取)
        method: item.toUpperCase() //=>以后执行肯定是ajaxPromise.head执行，不会设置METHODS这个配置项，我们自己需要配置才可以
      };
      return ajaxPromise(options);
    };
  });


  // => POST
  ['post', 'put', 'patch'].forEach(item => {
    ajaxPromise[item] = function anonymous(url, data = {}, options = {}) {
      options = {
        ..._default, // 默认值或者基于defaults修改的值
        ...options, // 用户调取方法传递的配置项
        url: url, // 请求的URL地址(第一个参数：默认的配置项和传递的配置项中都不会出现URL，只能这样获取)
        method: item.toUpperCase(), // 以后执行肯定是ajaxPromise.head执行，不会设置method这个配置项，我们自己需要配置才行
        data: data
      }
      return ajaxPromise(options)
    }
  });

  window.ajaxPromise = ajaxPromise
})(window)