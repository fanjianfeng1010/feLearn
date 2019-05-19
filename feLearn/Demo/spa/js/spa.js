let spa = (function () {
  let initModule = function ($container) {
    $container.html(
      `<h1 style="display:inline-block; margin:25px;">
      hello world
      </h1>`
    )
  }

  return {

    initModule
  }
})()