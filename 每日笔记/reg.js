let str = `<p>1.技术能力<br>能力这个没得说，公司招人就是干活的，能力不足自然无法通过技术面试。刚入门或者初级工程师想要通过技术面试的话，如果你没有一方面特别精的就打造一个全才的自己吧，<br>咱们简单的列下知识点：<br>html方面，<br>哪些元素是inline。哪些是inline-block，哪些是block的？<br>html标签的嵌套规范是什么？<br>什么是寓意话标签？<br>meta标签都有什么作用？<br>哪些标签的使用可以有利于seo？</p>
<p>css方面<br>清除浮动的方法？<br>div嵌套img时多出的空白怎么解决？<br>margin击穿问题怎么解决？<br>什么是盒子模型？<br>什么是bfc，ifc？<br>position设置为absolute时div宽度是怎样的？<br>position为relative时z-index起作用吗？<br>怎么实现左右各100px，中间div宽度自适应的布局。<br>同时对top 1s和width 2s进行transition控制的时候怎么写？<br>rgba的含义<br>opacity和rgba的区别？<br>你有几种方式可以实现元素的上下居中？<br>说下你对rem的理解？<br>响应式布局的优缺点<br>less里面怎么实现色值加深20%<br>less里面怎么去引入代码块<br>less里面哪个符号代表作用域元素本身？<br>sass同上</p>
<p>js方面<br>说下你对继承，封装，多态的理解？<br>说下你对闭包的理解？<br>说下jquery里链式编程的原理<br>怎么实现原型替换？<br>举一个例子来说明作用域的变量提升<br>bind和apply的区别<br>箭头函数的新特性是什么<br>import是同步还是异步<br>多次引入同一个模块会触发几次模块的全局事件<br>promise怎么使用，解决了什么问题<br>怎么去统一管理promise的error<br>什么是amd和cmd</p>`;
const filterHtmlText = str => {
  let reg = /\<\/?\w+\>/g;
  return str.replace(reg, "");
};
filterHtmlText(str);
