import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';

let store = createStore(reducer, applyMiddleware(reduxLogger, reduxThunk, reduxPromise))
export default store

/**
 * redux 中间件
 *  redux-logger:能够在控制台清晰的展示出当前 redux 操作的流程和信息(原有状态,派发信息,修改后的状态信息)
 *
 *  redux-thunk:处理异步的 dispatch
 *
 *  redux-promise:在 dispatch 派发的时候支持 promise 操作
 */