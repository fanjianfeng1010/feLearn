// 第一步，获取需要操作的元素 
let queeBox = document.querySelector('.wrapper')

// 第二步，复制列表的内容，使得能够无缝
queeBox.innerHTML += queeBox.innerHTML
//因为上面的步骤使得列表元素多了一倍，所以列表的宽度也要增加一倍
//首先要先获取当前列表容器的宽度，然后再让它的宽度增加一倍
// console.log(typeof window.getComputedStyle(queeBox, null)['width'])
let queeBoxWidth = parseFloat(window.getComputedStyle(queeBox, null)['width']) * 2
queeBox.style.width = queeBoxWidth + 'px'

// 第三步，让容器的自动向左移动

setInterval(() => {
  let queeBoxLeft = parseFloat(window.getComputedStyle(queeBox, null)['left'])
  queeBoxLeft--
  console.log(queeBoxLeft)
  queeBox.style.left = queeBoxLeft + 'px'
  // 当queeBox 移动到末尾时，立刻把queeBox的left设置回原点，这样就能使得一直循环下去
  let queeBoxCurLeft = queeBox.offsetLeft
  if (Math.abs(queeBoxCurLeft) >= queeBoxWidth / 2) {
    queeBox.style.left = 0 + 'px'
  }
  // console.log(queeBoxCurLeft)
  // console.log(queeBoxLeft)
}, 10)