// 第一步 获取要操作的元素
let imgBox = document.querySelector('#imgBox')
let img = imgBox.querySelector('img')
console.log(img)

// 设置定时器让图片延迟加载
setTimeout(() => {
  // 获取真正的图片地址
  let trueSrc = img.getAttribute('data-src')
  // 设置一个临时的图片对象
  let tempImg = new Image()
  tempImg.onload = () => {
    // 显示真实的图片
    img.style.display = 'block'
    img.setAttribute('src', trueSrc)
  }
  tempImg.src = trueSrc
  console.log(trueSrc)
}, 1000)