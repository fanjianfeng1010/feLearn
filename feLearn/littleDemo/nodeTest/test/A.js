const sum = (...arr) => {
  return arr.reduce((acc, cur) => acc + cur, 0)
}

module.exports = {
  sum: sum
}