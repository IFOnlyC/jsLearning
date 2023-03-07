console.log('Importing shoppingCart module');

import add, { cart } from './shoppingCart.js';
import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';

add('pizza', 2);
add('bread', 4);
add('apples', 3);

// imports are not copies of the exports
// they are like a live connection
// they point to the same place in the memory
console.log(cart);

/////////////////////////////////////
// use 'await' outside the async function (ES2022)
// BUT: this will block the execution of the entire module
// console.log('Start fetching.');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// let data2 = [1, 2, 3];
// console.log(data2.at(-1));
// console.log('Something happened.');

/////////////////////////////////////
// CommonJS module
// const {addTocart} = require('./shoppingCart.js');

/////////////////////////////////////
// Copying objects - cloneDeep
const state = {
  testprice: 10,
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 3 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);
