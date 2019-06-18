$(function () {


  let $main = $('main'),
    $header = $main.find('.header'),
    $logo = $header.find('.logo'),
    $logoImg = $logo.find('img'),
    $menu = $header.find('.menu'),
    $login = $header.find('.login'),
    $search = $header.find('.search')

  $(window).on('scroll', ev => {


    if (window.scrollY <= 40) {

      // => 把Header变为固定在浏览器上部分
      $header.removeClass('fixed')

      // logo缩小处理
      $logoImg.removeClass('shrink')
      $logoImg.addClass('normal')

      // => input 上升处理
      $search.removeClass('shrinkInput')

      // => 菜单&登录下移
      $menu.removeClass('moveDown')
      $login.removeClass('moveDown')


    }
    if (window.scrollY >= 40) {
      // logo 放大处理
      $logoImg.removeClass('normal')
      $logoImg.addClass('shrink')

      // => input 变回原样
      $search.addClass('shrinkInput')
      $menu.addClass('moveDown')
      $login.addClass('moveDown')
      $header.addClass('fixed')

      //
    }

  })
})

