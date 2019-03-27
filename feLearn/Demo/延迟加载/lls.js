$(function () {
  //获取要操作的数据
  $container = $('.container')
  $imgList = null

    // 1 获取数据
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
      // 向容器插入数据
      $container.html(str)

      // 图片列表赋值
      $imgList = $container.find('img')
      // console.log($imgList)
    }()

  // 单个图片加载,传入一个图片，加载一个图片
  const loadImg = curImg => {
    // 获取真实的图片地址
    let $curImg = $(curImg)
    let trueImg = $curImg.attr('data-src')
    // 设置一个临时的图片对象
    let tempImg = new Image()
    tempImg.onload = () => {
      // 让真实的图片显示
      $curImg.css({
        'display': 'block'
      })
      $curImg.attr('src', trueImg)
      tempImg = null
      curImg.isLoaded = true
    }
    tempImg.src = trueImg
  }

  // 设置图片加载的条件
  const lazyLoad = () => {
    // 遍历图片列表，判断是否满足加载的条件
    $imgList.each((index, curImg) => {
      let $curImg = $(curImg),
        $imgBox = $curImg.parent(),
        A = $imgBox.offset().top + $imgBox.outerHeight(),
        B = document.documentElement.scrollTop + document.documentElement.clientHeight;
      if (A <= B) {
        // 当图片盒子的上偏移 + 盒子本身的高度 < 滚动条卷去的高度 + 一屏幕的高度时
        // 说明图片盒子已经完全出现在屏幕上，此时就需要加载图片
        if (curImg.isLoaded) {
          // 如果图片已经加载过了，就不需要再次加载
          return
        }
        loadImg(curImg)
      }
    })
  }
  $(window).on('load scroll', lazyLoad)
})