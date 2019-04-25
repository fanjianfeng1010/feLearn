let headerRender = (function() {
  let $headerBox = $(".headerBox"),
    $navMenu = $headerBox.find(".navMenu"),
    $navBox = $(".navBox");

  let handleTap = function handleTap() {
    $navBox.toggle();
  };

  return {
    init: function init() {
      $navMenu.tap(handleTap);
    }
  };
})();

headerRender.init();

let bannerRender = (function() {
  let $bannerBox = $(".bannerBox"),
    $wrapper = $bannerBox.find(".swiper-wrapper");

  const queryData = function queryData() {
    console.log(111);
    return new Promise(resolve => {
      $.ajax({
        url: "banner.json",
        dataType: "json",
        success: resolve
      });
    });
  };

  const bindHTML = function bindHTML(result) {
    console.log(result);
    let str = ``;
    result.forEach(element => {
      let { img, desc } = element;
      str += `
        <div class="swiper-slide">
          <img src="${img}" alt="">
          <p>${desc}</p>
        </div>
      `;
    });
    $wrapper.html(str);
    $bannerBox.css("display", "block");
  };
  const swiperInit = function swiperInit() {
    let swiper = new Swiper(".bannerBox", {
      loop: "true",
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
      pagination: ".swiper-pagination",
      paginationType: "fraction"
    });
  };

  return {
    init: function init() {
      let promise = queryData();
      promise.then(bindHTML).then(swiperInit);
    }
  };
})();

bannerRender.init();

let messageRender = (function() {
  let $messageBox = $(".messageBox"),
    $wrapper = $messageBox.find(".swiper-wrapper");

  const queryData = function queryData() {
    console.log(111);
    return new Promise(resolve => {
      $.ajax({
        url: "aside.json",
        dataType: "json",
        success: resolve
      });
    });
  };

  const bindHTML = function bindHTML(result) {
    console.log(result);
    let str = ``;
    result.forEach(element => {
      let { title, link } = element;
      str += `
      <div class="swiper-slide"> 
        <a href="${link}">${title}</a> 
      </div>
      `;
    });
    $wrapper.html(str);
    $messageBox.css("display", "block");
  };
  const swiperInit = function swiperInit() {
    let swiper = new Swiper(".messageCon", {
      loop: "true",
      autoplay: 3000,
      direction: "vertical"
    });
  };

  return {
    init: function init() {
      let promise = queryData();
      promise.then(bindHTML).then(swiperInit);
    }
  };
})();
messageRender.init();
