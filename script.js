function Person(name,age){
    this.name = name;
    this.age = age;

}
Person.prototype.introduce = function(){
    console.log(`Hi my name is ${this.name} and I am ${this.age} years old.`);
};
function Employee(name,age,jobTitle){
    Person.call(this,name,age);
    this.jobTitle = jobTitle;
}
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.work = function(){
    console.log(`${this.name} is working as a ${this.jobTitle}.`);
};
const person1 = new Person("john",30);

const employee1 = new Employee("jane",25,"software engg");
person1.introduce();
employee1.introduce();

employee1.work();