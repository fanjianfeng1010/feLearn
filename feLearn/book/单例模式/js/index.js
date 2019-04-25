/* const CreateDiv = (function () {
  let instance;

  const CreateDiv = function (html) {
    // 如果实例之前已经存在，返回已经被创建的实例，以此来确保唯一单例
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();

    return instance = this;
  };

  CreateDiv.prototype.init = function () {
    let div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  }

  return CreateDiv
})()

// 弊端，如果某天需要用到这个类来构造多个DIV，就需要重写createDiv方法，把控制创建唯一对象的那段去掉，这种修改会为以后带来不必要的麻烦
let a = new CreateDiv('seven1');
let b = new CreateDiv('seven2');
console.log(a === b)
 */
/**
 * 代理模式实现单例
 * 这种模式是模仿传统面向对象语言的形式做的，对于js来说，生硬的添加类并没有实际的意义，
 * JS本身创建对象就十分简单，先套上一个类在执行，无异于为代码套上一层枷锁
 */

/* const CreateDiv = function (html) {
  this.html = html;
  this.init();
};

CreateDiv.prototype.init = function () {
  let div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
}

// 代理类 proxySingletonCreateDiv

const proxySingletonCreateDiv = (function () {
  let instance;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }

    return instance;
  }
})();

let a = new proxySingletonCreateDiv('seven1');
let b = new proxySingletonCreateDiv('seven2'); */


/**
 *   惰性单例指的是在需要的时候才创建对象实例。惰性单例是单例模式的重点，
 * 这种技术在实 际开发中非常有用，有用的程度可能超出了我们的想象，
 * 实际上在本章开头就使用过这种技术，
 * instance 实例对象总是在我们调用 Singleton.getInstance 的时候才被创建，而不是在页面加载好 的时候就创建，代码如下:
 */

Singleton.getInstance = (function () {
  let instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  }
})()

let loginLayer = (function () {
  let div = document.createElement('div');
  div.innerHTML = 'I`m loginFor';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
})();
document.getElementById('loginBtin').onclick = function () {
  loginLayer.style.display = 'block';
}

const createIframe = (function () {
  let iframe;
  return function () {
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
    return iframe;
  }
})();

const getSingle = function (fn) {
  let result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  }
}