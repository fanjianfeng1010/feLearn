$(function () {
  // 第一步 获取要操作的元素
  let $container = $('.container')
  let $imgList = null
  console.log($container);

  // 绑定数据
  ~ function () {
    let str = ''
    for (let i = 0; i < 100; i++) {
      let ran = Math.round(Math.random() * 3 + 1)
      str += `
      <div class="imgBox">
      <img src="" alt="" data-src="img/banner${ran}.jpg">
  </div>
      `
    }
    $container.html(str)
    $imgList = $container.find('img')
  }()

  // 加载真实的图片
  // lazyImg:单张图片延迟加载，传递进来要加载的图片
  const lazyImg = curImg => {
    let $curImg = $(curImg)
    trueImg = $curImg.attr('data-src')
    let tempImg = new Image()
    tempImg.onload = () => {
      $curImg.attr('src', trueImg)
        .stop().fadeIn(300)
      tempImg = null
      curImg.isLoad = true
    }
    tempImg.src = trueImg
  }
  // computedImg:计算那张图片可以加载了
  const computedImg = () => {
    $imgList.each((index, curImg) => {
      let $curImg = $(curImg),
        $imgBox = $curImg.parent(),
        A = $imgBox.offset().top + $imgBox.outerHeight(),
        B = document.documentElement.scrollTop + document.documentElement.clientHeight;
      if (A <= B) {
        //=>代表图片所在盒子呈现在视野中，开始加载真实的图片
        if (curImg.isLoad) {
          //=>当前图片如果已经加载过了，不在重复的加载
          return;
        }
        lazyImg(curImg);
      }
    })
  }
  $(window).on('load scroll', computedImg)
})