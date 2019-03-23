let wrapper = document.querySelector('.wrapper')
// 把wrapper原有的li整体克隆一份，放到容器末尾（无缝滚动）
/* let wrapperList = wrapper.querySelectorAll('li')
let frg = document.createDocumentFragment();
[].forEach(wrapperList, item => {
  frg.appendChild(item.cloneNode(true))
});
wrapper.appendChild(frg)
frg = null */
wrapper.innerHTML += wrapper.innerHTML
console.log(utils.css(wrapper, 'width'))
utils.css(wrapper, 'width', utils.css(wrapper, 'width') * 2);
console.log(utils.css(wrapper, 'width'))
// 克隆完成后别忘记修改一下wrapper的宽度（内容变多了）

/**
 * 实现js动画，
 *  让wrapper每间隔一端时间（最优动画时间是13~18ms）在UR有的left值基础上减去步长（想让动画快一点，步长就大一点）
 */
setInterval(() => {
    let curLeft = utils.css(wrapper, 'left')
    // console.log(curLeft)
    curLeft -= 2
    utils.css(wrapper, {
      left: curLeft
    })
    // => 实现无缝，当我们ul距离marquee-box的做便宜已经是整个wrapper的一般宽度（第一组原始内容已经运到完成了，现在看到的是克隆后的），此时让
    // 我们的wrapper立即运动到left为零的位置即可
    if (Math.abs(wrapper.offsetLeft) >= utils.css(wrapper, 'width') / 2) {
      utils.css(wrapper, 'left', 0)
    }
  },
  13)