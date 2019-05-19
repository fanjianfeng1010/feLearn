let PromiseA = require('./promiseA')
console.log(PromiseA);

new PromiseA((resolve, reject) => {
  setTimeout(() => {
    Math.random() < 0.5 ? resolve(100) : reject(200)
  }, 1000);
  throw new Error('错了野')
}).then(r => {
  console.log(3);
}, J => {
  console.log('no', J);
})

console.log(2);
