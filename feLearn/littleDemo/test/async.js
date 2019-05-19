/* setTimeout(() => {
  console.log(1);
}, 20)

setTimeout(() => {
  console.log(2);
}, 0);

console.time('WHILE');
let i = 0
while (i <= 9) {
  i++
}
console.timeEnd('WHILE');

setTimeout(() => {
  console.log(3);
}, 10);

console.log(4); */

function AA() {
  console.log(1)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(200)
    }, 0);
  })
}
async function fn() {
  console.log(2);
  let res = await AA()
  console.log(3);
}
fn()
console.log(4);