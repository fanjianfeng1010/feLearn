const A = require('./A')

const avg = (...arr) => {
  return A.sum(...arr) / arr.length
}

module.exports = {
  avg: avg
}