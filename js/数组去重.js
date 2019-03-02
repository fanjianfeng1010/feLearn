var unique1 = function(arr) {
  return arr.filter(function(a, index, arr) {
    return arr.indexOf(a) === arr.lastIndexOf(a);
  });
};
// 次方法有缺陷，还要再思考一下

// 教学方法
/*
 *1.一次拿出数组中的每一项
 *2.和当前拿出的项与后面的每一项依次比较
 *3.如果有重复的，把找到的项在原有数组中删除
 *此方法循环次数过多，不适合用于过大的数组 时间负责度是O(n^2)
 */

var unique2 = function(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    var item = arr[i];
    for (var j = i + 1; j < arr.length; j++) {
      if (item === arr[j]) {
        arr.splice(j, 1);
        j--; // 因为删除了当前的元素，则下一位元素取代了当前位置，下一次循环要不能忽略
      }
    }
  }
  return arr;
};
/*
 *  基于对象的属性名不能重复，可以实现性能的数组去重
 * 1.创建一个空的对象
 * 2. 依次遍历数组中的每一项，把每一项的值当做对象的属性名储存起来
 * 3. 在存储前个判断对象中是否存在当前属性名，如存在则当前元素重复了，即可在数组中移除当前元素
 * 4.这种删除方式也有问题，如果数组很长，所有索引值都要重新计算，浪费性能
 */
var unique3 = function(arr) {
  var count = {};
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (!count[item]) {
      count[item] = 1;
    } else {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};
/**
 * 根据上面第三种方法进行改进
 * 1.我们可以把当前重复项用数组最后一项来替换
 * 2.然后删除数组最后一项，这样就不用重新计算索引了
 */
/**
 *
 * 使用es6 Array.filter方法，过滤元素
 */
var unique4 = arr => {
  return arr.filter((item, index, arr) => {
    return arr.indexOf(item) == index;
  });
};
// 日期字符串格式化
var stringFormat = function(str) {
  var [bigNum, litteNum] = str.split(" ");
  var [year, month, day] = bigNum.split("-");
  var [hour, minute, second] = litteNum.split(":");
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return `${month}月${day} ${hour}时${minute}分`;
};
