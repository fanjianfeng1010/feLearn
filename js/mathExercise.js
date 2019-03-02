/**
 * 生成一个思维随机验证码
 * 思路：
 * 1.使用Math.raodm()方法生成随机数，
 * 2.字符串相加,返回
 */
// ASCII码 0-9 是 48-57
// A-Z 是 65-90 
// var randomCode = function () {
//   var str = ''
//   for (var i = 0; i < 4; i++) {
//     oneOrTwo = Math.round(Math.random() * (2 - 1) + 1)
//     oneOrTwo === 1 ? str += randomLetter() : str += randomNum()
//   }
//   return str
// }

// var randomLetter = function () {
//   var random = Math.round(Math.random() * (90 - 65) + 65)
//   return String.fromCharCode(random)
// }

// var randomNum = function () {
//   return Math.round(Math.random() * (9 - 1) + 1)
// }

// var aLink = document.getElementById('link')
// var codeBox = document.getElementById('codebox')
// codeBox.innerHTML = randomCode()
// aLink.onclick = function () {
//   codeBox.innerHTML = randomCode()
// }

/**
 * 课程方法
 */
var aLink = document.getElementById('link')
var codeBox = document.getElementById('codebox')
var querCode = function () {
  codeArea = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var result = ''
  for (var i = 0; i < 4; i++) {
    var n = Math.round(Math.random() * 61)
    char = codeArea.charAt(n)
    if (result.indexOf(char) > -1) {
      i--
      continue
    }
    result += char
  }
  return result
}

codeBox.innerHTML = querCode()
aLink.onclick = function () {
  codeBox.innerHTML = randomCode()
}
// 用while 循环解答可以更简洁
querCode2 = function () {
  codeArea = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var result = ''
  while (result.length < 4) {
    var n = Math.round(Math.random() * 61)
    char = codeArea.charAt(n)
    if (result.indexOf(char) === -1) {
      result += char
    }
  }
  return result
}