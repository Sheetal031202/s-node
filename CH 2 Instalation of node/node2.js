console.log("hello")


let num = 25;

// old console syntax
(num % 2 == 0) ? console.log("even") : console.log("odd")


// new
console.log(`Number is ${num % 2 == 0 ? "even" : "odd"}`);
