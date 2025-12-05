// const sum=require("./node4_Math")
// console.log(sum.add(5,2))
// console.log(sum.less(5,2))

// or distribute
const {add,less}=require("./node4_Math")
console.log(add(5,2))
console.log(less(5,2))

// distribute
const obj={
    name:'sheetal',
    age:"25"
}
let{name,age}=obj
console.log(` object = my name is ${name} and i m ${age} years old`)

// array
const array=[10,20,30,40.2,true,"raj"]
let[a,b,c,d,e,f]=array
console.log(`Array =..${a}....${b}....${c}....${d}....${e}....${f}..`)