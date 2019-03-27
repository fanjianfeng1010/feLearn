window.onload = function () {
  // 第一步，获取操作的元素
  let imgBox = document.getElementById('imgBox')
  let img = imgBox.getElementsByTagName('img')[0]
  console.log(img)

  // 第二步 设置定时器让其延迟加载
  setTimeout(() => {
    // 获取图片的真实地址
    let truesrc = img.getAttribute('data-src')

    // 创建一个临时的Img来验证
    let imgT = new Image
    imgT.onload = function () {
      // 当图片加载完成后触发这个事件
      img.src = truesrc
      img.style.display = 'block'
      imgT = null
    }
    imgT.src = truesrc
  }, 1000)
}