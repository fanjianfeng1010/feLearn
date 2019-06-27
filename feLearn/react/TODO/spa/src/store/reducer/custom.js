import * as TYPES from '../action-types';

export default function custom(state = {
}, action) {
  state = JSON.parse(JSON.stringify(state)) //=> 深度克隆

  switch (action.type) {

  }
  return state
}