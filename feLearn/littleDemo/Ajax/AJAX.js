(function anonymous(window) {
  function AJAX(options) {
    return new AJAX.prototype.init(options);
  }

  AJAX.prototype = {
    constructor: AJAX,
    inti(options) {
      // init param
      let {
        url,
        method = "GET",
        data = null,
        dataType = "JSON",
        async = true,
        cache = true,
        success,
        error
      } = options;

      // => mount 把配置项挂载到实例上
      [
        "url",
        "method",
        "data",
        "dataType",
        "async",
        "cache",
        "success",
        "error"
      ].forEach(item => {
        this[item] = eval(item); // eval把字符串当做JavaScript代码运行
      });

      // => send ajax
      this.sendAjax();
    },
    sendAjax() {
      this.handlData();
      this.handleCache();

      // send
      let { method, url, async, dataType,error,success,data } = this;
      let xhr = new XMLHttpRequest();
      xhr.open(method, url, async);
      xhr.onreadystatechange = () => {
        // error
        if (!/^(2|3)\d{2}$/.test(xhr.status)) {
          error && error(xhr.statusText, xhr);
          return;
        }
        // success
        if (xhr.readyState === 4) {
          // => 处理datatype
          let result = this.handlDataType(xhr);
          success && success(result,xhr);
        }
      };
      xhr.send();
    }
    // 处理数据类型
    handlDataType(xhr) {
      let {dataType} = this.dataType.toUpperCase(),
      result =  xhr.responseText;
      switch(dataType) {
        case 'TEXT':
          break;
        case 'JSON':
          result = JSON.parse(result);
          break;
        case 'XML':
          result = xhr.responseXML;
          break;
      }
      return result;
    },

    // 处理cache
    handleCache() {
      let {url,method,cache} = this;
      if(/^GET$/i.test(method) && cache === false) {
        url += `${this.check()}_= ${+new Date()}`; // url 末尾追加时间戳
        this.url = url;
      }
    },
    // 处理数据
    handlData() {
      let {data,method} = this;
      if(!data) return;
      if(typeof data === 'object') {
        // => 如果是个Object对象，我们把它转换为x-www-form-urlencoded这种模式，方便后期传递给服务器
        let str = ``;
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            let element = data[key];
            str += `${key}=${element}&`;
            
          }
        }
        data = str.substring(0,str.length-1);

      }
      
      // 根据请求方式不一样，传递给服务器的方式也不同
      if(/^(GET|DELETE|HEAD|TRACE|OPTIONS)$/i.test(method)) {
        this.url+=`${this.check()}${data}`;
        this.data = null;
        return
      } 
      this.data= data; // post类型请求
    },
    // 检测url中是否存在问号
    check() {
      return this.url.indexOf('?') > -1 ? '&':'?';
    },
  };
  AJAX.prototype.init.prototype = AJAX.prototype;

  window.ajax = AJAX;
})(window);
