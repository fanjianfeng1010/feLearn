function solve(files) {
  let reg = /(?:.*)(\.\w+)/g;
  let obj = {};
  let result = [];
  files.forEach((item, index) => {
    item.replace(reg, (...arg) => {
      let [, ext] = arg;
      obj.hasOwnProperty(ext) ? (obj[ext] += 1) : (obj[ext] = 1);
    });
  });
  let max = 0;
  for (let i in obj) {
    let item = obj[i];
    if (max < item) max = item;
  }
  for (let j in obj) {
    let itemj = obj[j];
    if (itemj === max) {
      result.push(j);
    }
  }
  return result.sort();
}

function solve(files) {
  let total = files
    .map(file => file.match(/\.\w+$/)[0])
    .reduce((acc, cur) => {
      acc[cur] ? (acc[cur] += 1) : (acc[cur] = 1);
      return acc;
    }, {});
  return total;
}

function solve(files) {
  let total = files
    .map(file => file.match(/\.\w+$/)[0])
    .reduce(
      (acc, cur) => (acc[cur] ? (acc[cur] += 1) : (acc[cur] = 1), acc), {}
    );
  return total;
}

let total = files
  .map(file => file.match(/\.\w+$/)[0])
  .reduce((acc, cur) => ((acc[cur] = (acc[cur] || 0) + 1), acc), {});


function solve(files) {
  let total = files.map(file => file.match(/\.\w+/)[0])
    .reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1
      return acc
    }, {})
  let max = Math.max(...Object.values(total))
  console.log(max)
  return Object.keys(total)
    .filter(key => total[key] == max)
    .sort()
}