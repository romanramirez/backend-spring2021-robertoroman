'use strict';

// This is a handmade object, without using constructors
let handmadeObject = {
  firstName: 'Roman',
  lastName: 'Ramirez',
  position: null,
  location: 'Los Angeles',
  active: true,
};

class Employee {
  constructor(firstName, lastName, position, workplace) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.location = workplace;
    this.active = false;
    this.energyHours = 16; // Hours of energy
    this.checkValues(); // This does a boolean logic check
    this.sayHello;
  }

  // Checks whether or not this.active is boolean
  checkValues() {
    if (!(typeof this.active === 'boolean')) {
      console.log('This object has an improper active value!');
    }

    // This sets lower and upper bounds for energyHours
    if (this.energyHours < 0) {
      this.energyHours === 0;
    } else if (this.energyHours > 24) {
      this.energyHours === 24;
    }
  }

  // SAY HELLO
  sayHello() {
    console.log(
      `Hello! My name is ${this.firstName}. I work as a ${this.position} at ${this.location}. How's the weather?`
    );
  }

  // Do Work
  doWork(hours) {
    // This checks whether typeof hours is a number
    if (typeof hours != 'number') {
      console.log('The value for hours is not valid!');
      return;
    }

    // If energyHours end up being less than 0
    if (this.energyHours - hours < 0) {
      console.log(
        `This employee, ${this.firstName}, does not have that much energy! They will work for ${this.energyHours} hours instead.`
      );

      hours = this.energyHours;

      this.energyHours = 0;
    } else {
      // Otherwise, subtract hours from energyHours
      this.energyHours -= hours;
      console.log(
        `${this.firstName} has ${this.energyHours} many hours of energy remaining!`
      );
    }
  }

  // Go To Sleep
  goToSleep(hours) {
    // This checks whether typeof hours is a number
    if (typeof hours != 'number') {
      console.log('The value for hours is not valid!');
      return;
    }

    if (hours + this.energyHours > 24) {
      let maxSleepHours = 24 - this.energyHours;
      console.log(
        `${this.firstName} does not need to sleep for that long! Sleep for ${maxSleepHours} instead.`
      );

      hours = maxSleepHours;
    }

    this.energyHours += hours;
    console.log(
      `${this.firstName} goes to sleep for ${hours} hours. They have ${this.energyHours} hours left of energy.`
    );
  }
}

let myFirstFactoryObject = new Employee('Roman', 'Ramirez', 'engineer', 'MEDA');

let mySecondFactoryObject = new Employee(
  'Eduardo',
  'Garcia',
  'teacher',
  'MEDA'
);

let myThirdFactoryObject = new Employee(
  'Cooler',
  'Thanu',
  'cat herder',
  'MEDA'
);
