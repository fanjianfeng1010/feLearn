const formatTime = timeStr => {
  let reg = /(\d+)/g
  let timeAry = timeStr.match(reg).map(item => {
    return item < 10 ? '0' + item : item
  })
  // ["2018", "4", "30", "17", "50", "23"]
  let [, month, day, hour, minute] = timeAry

  return `${month}-${day} ${hour}:${minute}`
}

const formatTime1 = (timeStr, template = '{0}年{1}月{2}日{3}时{4}分{5}秒') => {
  let ary = timeStr.match(/\d+/g).map(item => {
    return item < 10 ? '0' + item : item
  })
  console.log(ary)
  return template.replace(/\{(\d)\}/g, (...[, index]) => {
    console.log(index)
    return ary[index] || '00'
  })
}