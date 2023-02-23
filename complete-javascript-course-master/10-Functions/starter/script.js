'use strict';
/*
Coding Challenge #1
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an
array with the number of replies for each option. This data is stored in the starter
'poll' object below.
Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:
    1.1. Display a prompt window for the user to input the number of the
    selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
    1.2. Based on the input number, update the 'answers' array property. For
    example, if the option is 3, increase the value at position 3 of the array by
    1. Make sure to check if the input is a number and if the number makes
    sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a
string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each
'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
object! So what should the this keyword look like in this situation?

Test data for bonus:
§ Data 1: [5, 2, 3]
§ Data 2: [1, 5, 3, 9, 6, 1]
*/
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    const option = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(option);
    typeof option === 'number' &&
      option < this.answers.length &&
      this.answers[option]++;

    console.log(this.answers);
  },
  displayResults: function (type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(',')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// call
// the first parameter is the object you want 'this' points to
// the others are the normal function parameters
poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

// apply
// the first parameter is the object you want 'this' points to
// the second paramter is an array of the function parameters

// function only called once
(function () {
  console.log('this function will never run again');
})();

(() => console.log('this function will never run again'))();

// Closure Example
// Example 1
const securebooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers.`);
  };
};

const booker = securebooking();
booker();
booker();
booker();

// Example 2
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 77;
  f = function () {
    console.log(b * 2);
  };
};

g(); // even if g() is ended, f() can still be able to access the varible a
f();
// re-assigning f fcuntion
h();
f();

// Example 3
const boardPassengers = function (n, wait) {
  const perGroup = n / 3; // if I comment this, it will use the outside 'perGroup'
  setTimeout(function () {
    console.log(`We are boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds.`);
};

const perGroup = 1000;
boardPassengers(180, 3);
