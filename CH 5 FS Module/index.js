console.log("FS MODULE (file system)")


let fsModule = require('fs')
// console.log(fsModule)

// ----------------------------------------------------------------------------------------
// WRITE
// 1 sync
fsModule.writeFileSync("one.txt", "async file ")
fsModule.writeFileSync("date.txt", new Date().toLocaleString())
fsModule.writeFileSync("one.txt", "this overWrite  ")
// 2 async
// aama async ma  3rd parameter ma call back function farjoyat aapvau
fsModule.writeFile("two.txt", "2n file", (err) => {
    console.log(err)
})
// --------------------------------------------------------------------------------------------------


// --------------------------------------------------------------------------------------------------
// APPEND
// 3
fsModule.appendFileSync("./one.txt", "\nthis is append ..it will not over write")
// 4 
fsModule.appendFileSync("./two.txt", "\nthis is  file is here append", (e) => {
    console.log(e)
})
// --------------------------------------------------------------------------------------------------


// --------------------------------------------------------------------------------------------------
// READ
// 5   string ma aave ne variavle ma store karvanu, ane aaya encording aapvanu
const allRead =fsModule.readFileSync("./one.txt","utf-8")
console.log(allRead)

// 6 
fsModule.readFile("./two.txt","utf-8",(e,data)=>{
    if(e){
        console.log(e)
    }
    else{
        console.log(data)
    }
})
// --------------------------------------------------------------------------------------------------



// //7 to delete file- 
// fsModule.unlink( file name)
// fsModule.unlinkSync(file name)

// 8
// to copy file
// fsModule.copyFile(je file copy karvani CacheHandler,jema copy karvani chhe)
// fsModule.copyFileSync(je file copy karvani CacheHandler,jema copy karvani chhe)