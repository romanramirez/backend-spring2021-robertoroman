let rentalDate = 'May 1st, 2019';

// Generic Vehicle Class
class Vehicle {
  constructor(make, model, year, color, lastService, mileage, topSpeedMPH) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    this.lastService = new Date();
    this.mileage = mileage;
    this.topSpeedMPH = topSpeedMPH;
  }
}

// Generic Car Class
class Car extends Vehicle {
  constructor(
    make,
    model,
    year,
    color,
    lastService,
    mileage,
    topSpeedMPH,
    mpg,
    vin,
    tankSizeGallons,
    currentFuel
  ) {
    // This is the constructor for extending the vehicle class
    super(make, model, year, color, lastService, mileage, topSpeedMPH);
    this.mpg = mpg;
    this.vin = vin;
    this.tankSizeGallons = tankSizeGallons;
    this.currentFuel = currentFuel;
  }

  travel(miles) {
    let fuelUsage = miles / this.mpg;

    if (miles > this.currentFuel + this.mpg) {
      console.log("You can't makes this trip on this amount of gas.");
      return;
    }

    this.mileage += miles;

    console.log(`${this.make} ${this.model} goes on a ${miles} trip!`);
  }
}

// Electric Car Class
class ElectricCar extends Vehicle {
  constructor(
    make,
    model,
    year,
    type,
    color,
    lastService,
    topSpeedMPH,
    empg,
    mileage,
    kWh
  ) {
    super(make, model, model, year, mileage, color, lastService, topSpeedMPH);
    this.type = type;
    this.empg = empg;
    this.kWh = kWh;
  }
}

let car1 = new Car(
  'Honda',
  'Accord',
  2020,
  'coupe',
  'red',
  19801230,
  20,
  19,
  19033,
  'LZ3THJ',
  rentalDate,
  120
);

let testCar = new ElectricCar('Tesla', 'Model S', 2019, 'Coupe', 121, 50, 80);

// getters => access properties
// setters => change (mutate) them

const person = {
  firstName = 'Mosh',
  lastName = 'Hamedani',
  

}

console.log(testCar);




