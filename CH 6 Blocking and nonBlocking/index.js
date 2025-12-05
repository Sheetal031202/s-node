const fsModule=require("fs")

// // sync
// console.log("first")
// const r=fsModule.readFileSync("./test.txt","utf-8")
// console.log(r)
// console.log("second")

// async
console.log("first")
fsModule.readFile("./test.txt","utf-8",(err,res)=>{
console.log(res)
})
console.log("second")



// const osModule=require('os')
// console.log('CPU '+ osModule.cpus().length)  