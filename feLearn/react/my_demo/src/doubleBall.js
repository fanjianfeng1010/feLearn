var createRandom = function createRandom() {
  let result = []
  let blueBall = 0
  for (let index = 0; index < 6; index++) {
    delay().then(() => {
      result.push(rand(33))
    })
  }
  blueBall = rand(16)

  result = `${result.join('.')} 蓝区 ${blueBall} `

  return result
}

const delay = function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

const rnd = function rnd(seed) {
  seed = (seed * 9301 + 49297) % 233280; //为何使用这三个数?
  return seed / (233280.0);
};

const rand = function rand(number) {
  let today = new Date()
  let seed = today.getTime();
  return Math.ceil(rnd(seed) * number);
};

createRandom()


