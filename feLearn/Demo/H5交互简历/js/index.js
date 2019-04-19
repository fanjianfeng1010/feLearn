let loadingRender = (function () {
  let $loadingBox = $('.loadingBox'),
    $current = $loadingBox.find('.current')

  let imgData = [
    "img/icon.png", "img/zf_concatAddress.png",
    "img/zf_concatInfo.png", "img/zf_concatPhone.png",
    "img/zf_course.png", "img/zf_course1.png",
    "img/zf_course2.png", "img/zf_course3.png",
    "img/zf_course4.png", "img/zf_course5.png",
    "img/zf_course6.png", "img/zf_cube1.png",
    "img/zf_cube2.png", "img/zf_cube3.png",
    "img/zf_cube4.png", "img/zf_cube5.png",
    "img/zf_cube6.png", "img/zf_cubeBg.jpg",
    "img/zf_cubeTip.png", "img/zf_emploment.png",
    "img/zf_messageArrow1.png", "img/zf_messageArrow2.png",
    "img/zf_messageChat.png", "img/zf_messageKeyboard.png",
    "img/zf_messageLogo.png", "img/zf_messageStudent.png",
    "img/zf_outline.png", "img/zf_phoneBg.jpg",
    "img/zf_phoneDetail.png", "img/zf_phoneListen.png",
    "img/zf_phoneLogo.png", "img/zf_return.png",
    "img/zf_style1.jpg", "img/zf_style2.jpg",
    "img/zf_style3.jpg", "img/zf_styleTip1.png",
    "img/zf_styleTip2.png", "img/zf_teacher1.png",
    "img/zf_teacher2.png", "img/zf_teacher3.jpg",
    "img/zf_teacher4.png", "img/zf_teacher5.png",
    "img/zf_teacher6.png", "img/zf_teacherTip.png"
  ]

  // run : 预加载图片
  let n = 0, // 记录已经加载完成的图片数
    len = imgData.length // 总图片数
  let run = function run(callback) {

    imgData.forEach(item => {
      let tempImg = new Image
      tempImg.onload = () => {
        tempImg = null
        $current.css('width', (++n / len * 100 + '%'))

        // 加载完成:执行回调函数(让当前loading页面消失)
        if (n === len) {
          clearTimeout(delayTimer) // 如果在规定时间内已经加载完成了，就不再执行maxDelay方法了
          callback && callback()
        }
      }
      tempImg.src = item
    })
  }

  // maxDelay:设置最长加载等待时间(假设10s，到达10s,看看我们加载了都了，如果到达了90%以上，我们可以正常访问内容了，如果不足这个比例，直接提示用户当前网络状态不佳，稍后重试)
  let delayTimer = null
  let maxDelay = function maxDelay(callback) {
    delayTimer = setTimeout(() => {
      if (n / len >= 0.9) {
        $current.css('width', 100)
        callback && callback()
        return
      }
      alert('当前网络不佳，请稍后再试')
      window.location.href = 'http://www.qq.com' // 此时我们不应该继续加载图片，而是让其关掉页面或者跳转到此其他页面
    }, 10000)
  }

  // => done:完成
  let done = function done() {
    // 停留一秒钟后移除
    let timer = setTimeout(() => {
      $loadingBox.remove()

      phoneRender.init()
    }, 1000)

  }

  return {
    init: function () {
      $loadingBox.css('display', 'block')
      run(done)
      maxDelay(done)
    }
  }
})()

let phoneRender = (function () {
  let $phoneBox = $('.phoneBox'),
    $time = $phoneBox.find('span'),
    $answer = $phoneBox.find('.answer'),
    $answerMarkLink = $answer.find('.markLink'),
    $hangUp = $phoneBox.find('.hangUp'),
    $hangUpMarkLink = $hangUp.find('.markLink'),
    answerBell = $('#answerBell')[0],
    introduction = $('#introduction')[0]

  let answerMarkTouch = function answerMarkTouch() {
    $answer.remove() // 按了接听，界面移除
    answerBell.pause() // 一定要先暂停播放，然后再移除，否则浏览器也会播放这个声音
    $(answerBell).remove()

    // 显示接听界面
    $hangUp.css('transform', 'translateY(0rem)')
    $time.css('display', 'block')
    introduction.play()
    computeTime()
  }



  // => 计算播放时间
  let autoTimer = null
  let computeTime = function computeTime() {
    let duration = 0
    // 要让audio播放，首先回去加载资源，部分资源加载完成后才会播放，才能计算出总时间duration等信息
    // 所以要把获取信息放到canplay事件中
    introduction.oncanplay = function () {
      duration = introduction.duration
    }
    autoTimer = setInterval(() => {
      let val = introduction.currentTime;
      if (val >= duration) {
        closePhone()
        clearInterval(autoTimer)
        return
      }
      let minute = Math.floor(val / 60),
        second = Math.floor(val - minute * 60)
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;
      $time.html(`${minute}:${second}`)
    }, 1000)
  }

  // => 关闭phone页面
  let closePhone = function closePhone() {
    clearInterval(autoTimer)
    introduction.pause()
    $(introduction).remove()
    $phoneBox.remove()

    // 加载下一个模块
    messageRender.init()
  }

  return {
    init: function () {
      // 显示phone模块
      $phoneBox.css('display', 'block');
      //=> 播放bell
      answerBell.play();
      answerBell.volume = 0.3

      // 点击answerMark
      $answerMarkLink.tap(answerMarkTouch)
      $hangUpMarkLink.tap(closePhone)
    }
  }
})()


let messageRender = (function () {
  let $messageBox = $('.messageBox'),
    $wrapper = $messageBox.find('.wrapper'),
    $messageList = $wrapper.find('li'),
    $keyBord = $messageBox.find('.keyBoard'),
    $textInpt = $keyBord.find('span'),
    $submit = $keyBord.find('.submit'),
    demonMusic = $('#demonMusic')[0];

  let step = -1, // 记录当前展示信息的索引
    total = $messageList.length + 1, // 记录信息总条数（因为有一条是自己手动发送的所有加1）
    autoTimer = null,
    interval = 1500; // 记录信息相继出现的时间间隔


  // 展示信息
  let tt = 0; // 记录transform translate的初始值
  let showMessage = function showMessage() {
    ++step;
    if (step === 2) {
      // 如果已经展示两条信息了，暂时结束自动播放,让键盘上升，开始手动发送
      clearInterval(autoTimer);
      // 键盘上升
      handleSend()
      return
    }
    let $cur = $messageList.eq(step); // eq 方法获得的是jQuery对象
    $cur.addClass('active');

    // 如果已经展示三条信息了，代表手动输入的信息也展示了，此时应该继续展示剩余的信息
    // 展示剩余信息的时候应该按照内容自动往上展示,
    // wrapper向上移动(移动的距离是新展示这一条的高度)
    if (step >= 4) {
      /*  let currentHeight = $cur[0].offsetHeight,
         wrapperTop = parseFloat($wrapper.css('top'));
       $wrapper.css('top', wrapperTop - currentHeight) */
      // 能用transform方法实现的动画就尽量不用纯css实现，因为transform会开启硬件加速
      let currentHeight = $cur[0].offsetHeight;
      tt -= currentHeight;
      $wrapper.css('transform', `translateY(${tt}px)`)
    }

    if (step >= total - 1) {
      clearInterval(autoTimer)
      closeMessage()
      return
    }
  }

  let closeMessage = function closeMessage() {
    let delayTimer = setTimeout(() => { // 为了让最后的信息显示全，设置延迟后再移除元素
      demonMusic.pause();
      $(demonMusic).remove();
      $messageBox.remove();

      clearTimeout(delayTimer)

      cubeRender.init()
    }, interval)

  }

  let handleSend = function handleSend() {
    $keyBord.css({
      transform: 'translateY(0rem)'
    }).one('transitionend', () => {
      // transitionEnd:监听当前元素transition动画结束的时间(并且有几个样式改变，
      // 并且执行了过渡效果，事件就会被触发执行几次) => 用one方法自自拍事件绑定只会让其触发一次
      let str = '好的马上介绍',
        n = -1,
        textTimer = null;
      textTimer = setInterval(() => {
        let originHTML = $textInpt.html();
        $textInpt.html(originHTML + str[++n]);
        if (n >= str.length - 1) {
          // 文字显示完成，清除定时器
          clearInterval(textTimer)
          $submit.css('display', 'block')
        }
      }, 50);
    });

  }

  // 点击submit
  let handleSubmit = function handleSubmit() {
    // 把心创建的li增加页面中的第二个li的后面
    $(` <li class="self">
        <i class="arrow"></i>
        <img src="img/zf_messageStudent.png" alt="" class="pic">
        ${$textInpt.html()}
      </li>`).insertAfter($messageList.eq(1)).addClass('active');
    $messageList = $wrapper.find('li');
    // 重新获取新的li列表，新的li放到页面中，此时应该重新获取li列表，让messagelist和页面中的li一一对应起来
    // 方便后期根据索引展示对应的li

    // => input内容消失，提交按钮转为非active
    $textInpt.html('');
    $submit.css('display', 'none');
    $keyBord.css('transform', 'translateY(3.7rem)');
    // 继续展示剩余的消息
    autoTimer = setInterval(showMessage, interval);
  }




  return {
    init: function () {
      $messageBox.css('display', 'block')
      // 加载模块立即展示一条信息，后期间隔interval再发送一条信息
      showMessage();
      autoTimer = setInterval(showMessage, interval);

      // => submit
      $submit.tap(handleSubmit)

      // => 播放音乐
      demonMusic.play()
      demonMusic.volume = 0.3
    }
  }
})()

let cubeRender = (function () {
  let $cubeBox = $('.cubeBox'),
    $cube = $cubeBox.find('.cube'),
    $cubeList = $cube.find('li');

  let start = function start(ev) {
    // 记录手指按在位置的其实坐标
    let point = ev.changedTouches[0];
    this.strX = point.clientX;
    this.strY = point.clientY;
    this.changeX = 0;
    this.changeY = 0;
  };

  let move = function move(ev) {
    // 用最新手机的位置 - 起始的位置，记录x/y轴的偏移
    let point = ev.changedTouches[0];
    this.changeX = point.clientX - this.strX;
    this.changeY = point.clientY - this.strY;
  };

  let end = function end(ev) {
    // 获取change值，rotate的值
    let {
      changeX,
      changeY,
      rotateX,
      rotateY
    } = this,
    isMove = false;
    // 验证是否移动 => 改变大于10像素的距离代表发生了滑动
    Math.abs(changeX) > 10 || Math.abs(changeY) > 10 ? isMove = true : null;

    // 只有发生移动才进行处理
    if (isMove) {
      // 1.左右滑动=> changeX => rotateY(正比: change越大，rotate越大)
      // 2.上下滑动=> changeY => rotateX(反比: change越大rotate越小)
      // 3. 为了让每一次操作的旋转角度小一点，我们可以把移动距离的1/3作为旋转的角度即可
      rotateX = rotateX - changeY / 3;
      rotateY = rotateY + changeX / 3;
      // 赋值给魔方盒子
      $(this).css('transform', `scale(0.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
      // 让当前旋转的角度成为下一次其实的角度
      this.rotateX = rotateX;
      this.rotateY = rotateY;
    }
    // 清空其他记录的自定义属性值
    ['strX', 'strY', 'changeX', 'changeY'].forEach(item => {
      this[item] = null;
    })
  };

  return {
    init: function () {
      $cubeBox.css('display', 'block');

      // 手指操作cube，让cube跟着旋转
      let cube = $cube[0];
      cube.rotateX = -35; // 记录初始的旋转角度(存储到自定义属性上)
      cube.rotateY = 35;
      $cube.on('touchstart', start)
        .on('touchmove', move)
        .on('touchend', end)

      // => 点击每一个面跳转到详情区域对应的面上
      $cubeList.tap(function () {
        $cubeBox.css('display', 'none');
        // 跳转到详情页区域，通过点击LI的索引，让其定位到具体的slide
        let index = $(this).index()
        console.log(index)
        detailRender.init(index);
      })
    }
  }
})()

let detailRender = (function () {
  let $detailBox = $('.detailBox'),
    swiper = null;
  $dl = $detailBox.find('.page1>dl');


  let swiperInit = function swiperInit() {
    swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      // 无缝切换原理:把真实第一张克隆放到末尾，把真实第一张克隆到最后
      onInit: move,
      onTransitionEnd: move
    });
  }

  let move = function move(swiper) {
    // swiper: 当前创建的实例
    // 判断当前是否为第一个slide:如果是让3D菜单展开，不是收起3D菜单
    let activeIndex = swiper.activeIndex,
      slideAry = swiper.slides;
    if (activeIndex === 0) {
      $dl.makisu({
        selector: 'dd',
        overlap: 0.6,
        speed: 0.8
      })

      $dl.makisu('open');
    } else {
      // 其他页面
      $dl.makisu({
        selector: 'dd',
        speed: 0
      })
      $dl.makisu('close');
    }

    // 2. 滑动到哪一个页面，把当前页面也只对应的ID，其余页面溢出ID即可
    slideAry.forEach((item, index) => {
      if (activeIndex === index) {
        item.id = `page${index+1}`;
        return;
      }
      item.id = null;
    })
  }

  return {
    init: function (index) {
      $detailBox.css('display', 'block');
      if (!swiper) {
        // 防止重复初始化
        swiperInit();
      }
      swiper.slideTo(index, 0); // => 直接运动到具体的slide页面
    }
  }
})()
// => 开发过程中，由于当前项目板块众多（每个板块都是一个单例），我们最好规划一种机制：通过标识判断可以让程序只执行对应板块内容，这样开发哪个板块，我们就把标识改为该板块(hash路由控制)

let url = window.location.href, //=> 获取当前页面的url地址 
  well = url.indexOf('#'),
  hash = well === -1 ? null : url.substr(well + 1)

switch (hash) {
  case 'loading':
    loadingRender.init();
    break;
  case 'phone':
    phoneRender.init();
    break;
  case 'message':
    console.log('running')
    messageRender.init();
    break;
  case 'cube':
    cubeRender.init();
    break;
  case 'detail':
    detailRender.init();
    break;
  default:
    loadingRender.init();
}