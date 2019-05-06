/*
 * @Author: fanjianfeg
 * @Date: 2019-04-27 13:07:02
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-28 12:20:14
 */
/**
 * @description:返回斐波那契数列的值
 * @param {number} n
 * @param {Array} meno
 */
const feb = (n, meno = []) => {
  if (meno[n] !== -1) {
    return meno[n];
  }
  if (n <= 2) {
    return 1;
  } else {
    meno[n] = feb(n - 1, meno) + feb(n - 2, meno);
  }

  return meno[n];
};

const febM = n => {
  let box = [];
  box[0] = 1;
  box[1] = 1;
  for (let i = 2; i <= n; i++) {
    box[i] = box[i - 1] + box[i - 2];
  }
  return box[n];
};
