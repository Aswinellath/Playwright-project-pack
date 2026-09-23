class Greeter{
    firstname = "Aswin";

    sayHello(){
        let self = this;
        setTimeout(() => {
            console.log("Hello, " + this.firstname);
        }, 500);
    }
}

let greeter = new Greeter();
greeter.sayHello();

function calculate(a: number,b:number, c:number): number{
    let total:number = a+b+c;
    return total;
}

let result: number = calculate(43,34,16);
console.log(result);