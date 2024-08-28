function Car(make, model, year, type, isAvailable = true) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.type = type;
  this.isAvailable = isAvailable;
}
// Customer constructor function
function Customer(name) {
  this.name = name;
  this.rentedCars = [];
}
Customer.prototype.rentCar = function (car) {
  if (car.isAvailable) {
    car.isAvailable = false;
    this.rentedCars.push(car);
    console.log(`${this.name} rented a ${car.make} ${car.model}.`);
  } else {
    console.log(`The ${car.make} ${car.model} is already rented.`);
  }
};
Customer.prototype.returnCar = function (car) {
  const carIndex = this.rentedCars.indexOf(car);
  if (carIndex > -1) {
    this.rentedCars.splice(carIndex, 1);
    setTimeout(() => {
      car.isAvailable = true;
      console.log(`${this.name} returned the ${car.make} ${car.model}.`);
    }, 2000); // Simulate 2 seconds delay
  } else {
    console.log(
      `The ${car.make} ${car.model} is not in ${this.name}'s rented cars.`
    );
  }
};
function PremiumCustomer(name, discountRate) {
  Customer.call(this, name);
  this.discountRate = discountRate;
}
PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;
function calculateRentalPrice(car, days, customer) {
  const baseRate = 50;
  let typeRate = 0;
  switch (car.type) {
    case "SUV":
      typeRate = 20;
      break;
    case "Sedan":
      typeRate = 10;
      break;
    default:
      typeRate = 0;
  }
  let total = (baseRate + typeRate) * days;
  if (customer instanceof PremiumCustomer) {
    total -= total * (customer.discountRate / 100);
  }
  console.log(`Total rental price for ${customer.name}: $${total.toFixed(2)}`);
  return total;
}
function Maintenance(car, delay) {
  setTimeout(() => {
    car.isAvailable = true;
    console.log(
      `The ${car.make} ${car.model} is now available after maintenance.`
    );
  }, delay);
}

const car1 = new Car("Toyota", "Corolla", 2020, "Sedan");
const car2 = new Car("Honda", "Civic", 2021, "Sedan");
const car3 = new Car("Ford", "Explorer", 2019, "SUV");
const customer1 = new Customer("Alice");
const customer2 = new PremiumCustomer("Bob", 10);
customer1.rentCar(car1);
customer2.rentCar(car2);
calculateRentalPrice(car1, 3, customer1); 
calculateRentalPrice(car2, 5, customer2); 
customer1.returnCar(car1);
customer2.returnCar(car2);
Maintenance(car3, 3000); 
