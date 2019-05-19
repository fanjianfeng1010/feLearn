class PromiseA {
  constructor(excutorCallback) {
    this.status = 'pending'
    this.value = null
    this.fulfilledAry = []
    this.rejectedAry = []

    let resultFn = result => {
      let timer = setTimeout(() => {
        clearTimeout(timer)
        if (this.status !== 'pending') return
        this.status = 'fulfilled'
        this.value = result
        this.fulfilledAry.forEach(item => item(this.value))
      }, 0);

    }

    let rejectFn = reason => {
      let timer = setTimeout(() => {
        if (this.status !== 'pending') return
        this.status = 'rejected'
        this.value = reason
        this.rejectedAry.forEach(item => item(this.value))
      }, 0);
    }
    try {
      excutorCallback(resultFn, rejectFn)
    } catch (error) {
      rejectFn(error)
    }
  }

  then(fulfilledCallBack, rejectedCallBack) {
    // => 处理不传递的请求
    typeof fulfilledCallBack !== 'function' ? fulfilledCallBack = result => result : null
    typeof rejectedCallBack !== 'function' ? rejectedCallBack = reason => {
      throw new Error(reason instanceof Error ? reason.message : reason)
    } : null

    // => 返回一个新的promise实例
    return new PromiseA((resolve, reject) => {
      this.fulfilledAry.push(() => {
        try {
          let x = fulfilledCallBack(this.value)

          x instanceof PromiseA ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      })
      this.rejectedAry.push(() => {
        try {
          let x = rejectedCallBack(this.value)
          x instanceof PromiseA ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      })
    })
    // this.fulfilledAry.push(fulfilledCallBack)
    // this.rejectedAry.push(rejectedCallBack)
  }

  catch(rejectedCallBack) {
    return this.then(null, rejectedCallBack)
  }

  static all(promiseAry) {
    return new PromiseA((resolve, reject) => {
      // => index记录成功的数量，result：记录成功的截个屏
      let index = 0,
        result = []
      for (let i = 0; i < promiseAry.length; i++) {
        // => promiseAry[i];每一个需要处理的promise实例
        promiseAry[i].then(val => {
          index++
          result[i] = val // 索引需要和promiseAry对应上，保证结果的顺序和数组顺序一致
          if (index === promiseAry.length) {
            resolve(result)
          }
        }, reject)
      }
    })
  }
  /*   static all(promiseAry = []) {
      return new PromiseA((resolve,reject)=> {
        let index = 0,
        setp = 0,
        result = []
        for (let i = 0; i < promiseAry.length; i++) {
         promiseAry[i].then(val=> {
           index++
           result[i] = val
           if(index===promiseAry.length) {
             resolve(result)
           }    
         })
          step++
        }
      })
    } */
}

module.exports = PromiseA