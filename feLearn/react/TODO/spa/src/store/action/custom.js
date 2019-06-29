import * as TYPES from '../action-types';

let custom = {
  //=> 增加客户信息:payload = {id,name}
  create(payload) {
    return {
      type: TYPES.CUSTOM_CREATE,
      payload
    }
  }
}

export default custom