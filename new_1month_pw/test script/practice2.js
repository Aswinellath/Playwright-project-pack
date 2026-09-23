"use strict";
class Greeter {
    firstname = "Aswin";
    sayHello() {
        let self = this;
        setTimeout(() => {
            console.log("Hello, " + this.firstname);
        }, 500);
    }
}
let greeter = new Greeter();
greeter.sayHello();
function calculate(a, b, c) {
    let total = a + b + c;
    return total;
}
let result = calculate(43, 34, 16);
console.log(result);
