const uniqueArray = ary => {
  let obj = {}
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    if (obj[item]) {
      ary[i] = ary[ary.length - 1]
      ary.length--
      i--
      continue
    }
    obj[item] = true
  }
  obj = null
  return ary
}

const uniqueArray = ary => {
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i]
    for (let j = i + 1; j < art.length; j++) {
      if (item === ary[j]) {
        ary[j] = ary[length - 1]
        ary.length--
        j--
      }
    }
    return ary;
  };
}
const uniqueArray = ary => {
  let newAry = []
  ary = ary.sort((a, b) => a - b)
  console.log(ary)
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i],
      nextItem = ary[i + 1]
    if (item !== nextItem) {
      newAry.push(item)
    }
  }
  return newAry;
}

let result = []
const deepAry = (ary) => {
  if (ary.length === 0) return
  for (let i = 0; i < ary.length; i++) {
    const element = ary[i]
    if (typeof ary[i] === 'object') {
      deepAry(element)
    } else {
      result.push(element)
    }
  }
  return result
}