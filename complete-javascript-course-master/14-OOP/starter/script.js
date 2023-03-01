'use strict';
/**
 * Abstraction
 * => Ignoring or hiding details that don't matter
 * => Getting an overview of the thing
 *
 * Encapsulation
 * => Keep propperties and methods private inside the class
 * => So they are not accessible from outside the class
 * => Some methods can be exposed as a public interface (API)
 *
 * Inheritance
 * => Making all properties and methods of a cetain class avaliable to a child class
 * => Allowing us to reuse common logic and to model real-world relationships
 *
 * Polymorphism
 * => A child can overwrite a method it inherited from a parent class
 */

///////////////////////////////////////
// Constructor functions
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  //   Never do this
  //   this.calcAge = function () {
  //     return 2037 - this.birthYear;
  //   };
};

const henry = new Person('Henry', 1998);
console.log(henry);

// 1. New -> an object is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

console.log(henry instanceof Person);

// Prototypes
Person.prototype.calcAge = function () {
  console.log(`From Person: ${2037 - this.birthYear}`);
};
henry.calcAge();

Person.prototype.species = 'Homo sapiens';

console.log(henry.__proto__);
console.log(henry.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(henry));

console.log(henry.hasOwnProperty('firstName'));
console.log(henry.species);
console.log(henry.hasOwnProperty('caspecieslcAge'));

///////////////////////////////////////
// ES6 classes

class Personcl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(`From Personcl: ${2037 - this.birthYear}`);
  }

  get age() {
    const age = 2037 - this.birthYear;
    console.log(`Your age is ${age}.`);
    return age;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    // _fullname: a convention to avoid name conflict
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name.`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('PersonCl: Hey there!');
    // console.log(this); // points to the class construction function
  }
}

const jessica = new Personcl('Jessica Davis', 1990);
console.log(jessica);
jessica.calcAge();

Personcl.prototype.greet = function () {
  console.log(`Hey! This is ${this.name}.`);
};
jessica.greet();

console.log(jessica.age);
console.log(jessica.fullName);

// NOTES
// 1. Classes are NOT hoisted, which means we cannot use them before their declaration
// 2. Classes are first-class citizens (we can pass them into functions and return them from functions)
// 3. Classes are executed in strict mode

// Setters and Getters
const account = {
  owner: 'Henry',
  movements: [200, 30, 50],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    return this.movements.push(mov);
  },
};

console.log(account.latest); // 50
account.latest = 60;
console.log(account.movements); // (4) [200, 30, 50, 60]

///////////////////////////////////////
// Static methods
// hey() simply attached to the class not to the prototype
// therefore, it cannot be inherited
Person.hey = function () {
  console.log('Person: Hey there!');
  //   console.log(this); // points to the class construction function
};
Person.hey();
// henry.hey();

Personcl.hey();
// jessica.hey();

///////////////////////////////////////
// Object.create
const PersonProto = {
  calcAge() {
    console.log(`From PersonProto: ${2037 - this.birthYear}`);
  },
};
const steven = Object.create(PersonProto);
// console.log(steven.__proto__);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

///////////////////////////////////////
// Inheritance between Classes: Constructor Functions
const PersonForInheritance = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
PersonForInheritance.prototype.calcAge = function () {
  console.log(`From PersonForInheritance: ${2037 - this.birthYear}`);
};

const Student = function (firstName, birthYear, course) {
  //   this.firstName = firstName;
  //   this.birthYear = birthYear;
  PersonForInheritance.call(this, firstName, birthYear); // simply let 'this' point to the object calling this.
  this.course = course;
};
// Linking prototypes
Student.prototype = Object.create(PersonForInheritance.prototype);
Student.prototype.introduce = function () {
  console.log(`Hi! I'm ${this.firstName} and I study ${this.course}.`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
// console.log(Student.prototype.constructor); // -> constructor of Person
Student.prototype.constructor = Student;
console.log(Student.prototype.constructor);

///////////////////////////////////////
// Inheritance between Classes: ES6 classes
class Studentcl extends Personcl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}
const martha = new Studentcl('Martha Davis', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

///////////////////////////////////////
// Inheritance between Classes: Object.create
const PersonProtoInherit = {
  calcAge() {
    console.log(`From PersonProtoInherit: ${2037 - this.birthYear}`);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const jonas = Object.create(PersonProtoInherit);
const StudentProtoInherit = Object.create(PersonProtoInherit);
StudentProtoInherit.init = function (firstName, birthYear, course) {
  PersonProtoInherit.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProtoInherit.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const jay = Object.create(StudentProtoInherit);
jay.init('Jay', 2001, 'Finance');
jay.introduce();
jay.calcAge();

///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)
class Account {
  // 1) Public fields (instances)
  locale = navigator.language;
  // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // Protected property
    // this._movements = [];
    // this.locale = navigator.language;
    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods
  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }
  // 4) Private methods
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1._movements.push(250);
// acc1._movements.push(-140);
// acc1.approveLoan(1000);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));
console.log(acc1);
Account.helper();

// Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/* 
Coding Challenge #1

Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them

Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h
*/

// Solution

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h.`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} km/h.`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
bmw.accelerate();
mercedes.accelerate();
bmw.brake();
mercedes.brake();

/*
Coding Challenge #2

Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.

Test data:
§ Data car 1: 'Ford' going at 120 km/h
*/

// Solution

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    return (this.speed = 1.6 * speed);
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h.`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h.`);
  }
}

const ford = new CarCl('Ford', 120);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);

/*
Coding Challenge #3

Your tasks:
1. Use a constructor function to implement an Electric Car (called 'EV') as a child
"class" of 'Car'. Besides a make and current speed, the 'EV' also has the
current battery charge in % ('charge' property)
2. Implement a 'chargeBattery' method which takes an argument
'chargeTo' and sets the battery charge to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20,
and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate',
'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
you 'accelerate'! Hint: Review the definiton of polymorphism 😉

Test data:
§ Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
*/

// Solution
const EV = function (make, speed, charge) {
  Car.call(this, make, speed); // simply let 'this' point to the object calling this.
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  return (this.charge = chargeTo);
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h,  with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
tesla.accelerate();
console.log(tesla);

/*
Coding Challenge #4

Your tasks:
1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class
2. Make the 'charge' property private
3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining!

Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
*/
class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h,  with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
rivian.accelerate().accelerate().chargeBattery(50).accelerate();
