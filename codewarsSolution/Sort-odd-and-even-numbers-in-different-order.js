/**
 * You have an array of numbers. Your task is to sort ascending odd numbers and descending even numbers.

Note that zero is even number. If you have an empty array, you need to return it.

Example

sortArray([5, 3, 2, 8, 1, 4]) == [1, 3, 8, 4, 5, 2]

 */
function sortArray(array = []) {
  if (array.length === 0) {
    return array
  }
  let odd = array.filter(x => x % 2 > 0).sort((a, b) => a - b)
  let even = array.filter(x => x % 2 === 0).sort((a, b) => b - a)
  return array.map(x => x % 2 > 0 ? odd.shift() : even.shift())
}