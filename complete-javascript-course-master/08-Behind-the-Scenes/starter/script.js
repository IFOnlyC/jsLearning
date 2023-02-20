// 'use strict';

/****** Scope chain *******/
const firstName = 'Henry';
calcAge(1998);

function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName);

  function printAge() {
    let output = `Your age is ${age}, born in ${birthYear}`;
    console.log(output);

    // block scope: only apply for let and const variables
    if (birthYear >= 1981 && birthYear <= 1998) {
      var millenial = true;

      // Creating new variable with the same name as the outer scope's variable
      // JavaScript always tries to look for variables in the current scope
      const firstName = 'John';

      // Reassign outer scope's variable
      output = 'new output!';

      const str = `Oh, and you're still a millenial, ${firstName}`;
      console.log(str);

      // ES6: under 'strict' mode
      // functions defined in the block scope are block scope
      function add(a, b) {
        return a + b;
      }
    }

    // Reference Error -> printAge is defined in "if" block scope
    // console.log(str);

    // variables defined by var are function scope
    console.log(millenial);

    // Reference Error
    // console.log(add(222, 333));

    console.log(output);
  }
  printAge();

  return age;
}
// Reference Error -> age is not defined in global scope
// console.log(age);

// Reference Error -> printAge is not defined in global scope
// printAge();

/****** Hoisting *******/
// variables
console.log(job); // -> undefined
// console.log(me); // -> cannot access before initialization
// console.log(year); // -> cannot access before initialization

var job = 'Developer';
let me = 'Henry';
const year = 1198;

/******* Hoisting *******/
// Functions
// we can call function declaration before it defines
console.log(addCalc(2, 3)); // return 5
// console.log(addExpression(2, 3));
// console.log(addArrow(2, 3));

function addCalc(a, b) {
  return a + b;
}

/*
Cannot access 'addExpression' before initialization
Cannot access 'addArrow' before initialization

const addExpression = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;
*/

/*
TypeError: addExpression is not a function
TypeError: addArrow is not a function
var variables will be initialized as undefined
and we are trying to call an undefined as a function, just like undefined(2, 3)

var addExpression = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;
*/

/******* Example *******/
// because we call a var variable before it defines
// so productNums will be initialized as undefined
// and because 'undefined' will be treated as 'false'
// so the deleteProducts() will still be executed
console.log(productNums);
if (!productNums) deleteProducts();

var productNums = 10;

function deleteProducts() {
  console.log('All products are deleted!');
}

/******* this keyword *******/
// Method: this = <Object that is calling the method>

// Simple function call: this = undefined (only under strict mode, otherwise, this = window)
/*
So not as a method and so not attached to any object. In this case, the this keyword, will simply be undefined.​
However, that is only valid for strict mode. So if you're not in strict mode, this will actually point to the global object,​
which in case of the browser is the window object. And that can be very problematic.​
*/

// Arrow functions: this = <this of surrounding function (lexical this)> (Arrow function doesn't get their own function)
/* 
arrow functions do not get their own 'this keyword'. Instead, if you use 'the this variable' in an arrow function,​
it will simply be the this keyword of the surrounding function. So of the parent function. and in technical terms, ​
this is called the 'lexical this keyword,' because it simply gets picked up from the outer lexical scope of the arrow function.​ 
*/

// Event listener: this = <DOM element that the handler is attached to>

// "this" does not points to the function itself, and also NOT the its variable envrionment

console.log(this); // window object

// Simple function call
const calcBithYear = function (age) {
  console.log(2023 - age);
  console.log(this); // undefined
};
calcBithYear(23);

// Arrow functions
const calcBithYearArrow = age => {
  console.log(2023 - age);
  // arrow function doesn't get its own 'this'
  // it will get its 'this' of parent function or its parents scope
  console.log(this); // window
};
calcBithYearArrow(23);

const jonas = {
  year: 1998,
  calcBithYear: function () {
    console.log(this); // jonas Object
    console.log(2023 - this.year);
  },
  calcBithYear: () => {
    console.log(this); // jonas Object
  },
};

jonas.calcBithYear();
