/* eslint-disable */
import React from 'react';
// import ReactDOM from 'react-dom';

let createElement = (type, props = {}, ...children) => {
  let ref = null,
    key = null;

  'ref' in props ? (ref = props['ref'], props['ref'] = undefined) : null;
  'key' in props ? (key = props['key'], props['key'] = undefined) : null;
  return {
    type,
    props: {
      ...props,
      //=> 保证children是一项或者是数组多项
      children: children.length < -1 ? (children[0] || '') : children
    },
    ref,
    key
  }
}

let objJSX = createElement('div', { className: 'content', ref: 'ref', key: 'key' }, 'p')
console.log(objJSX);