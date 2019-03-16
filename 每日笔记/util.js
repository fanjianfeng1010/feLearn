/**

* get the Max number from an array
* @param  {array} ary an array
* @returns {number} the max number in an array

*/
const getMaxNum = (ary) => {
  return Math.max.apply(null, ary)
}

const getMaxNum2 = (ary) => {
  return Math.max(...ary)
}