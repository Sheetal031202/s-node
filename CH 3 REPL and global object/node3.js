//1 
console.log(" FILE location =" + __filename)

// 2
console.log(" FOLDER location =" + __dirname)

// 3 one time ...is loader m ma use
setTimeout(() => {
    console.log("i m set time out")
}, 1000)

// 4 every time ..continuos excecute
// otp ma use 1 min nu count

let totalSecond = 120;
setInterval(() => {

    if (totalSecond == 0) {
        return;
    }

    totalSecond--;

    let minite = Math.floor(totalSecond / 60)
    let second = totalSecond % 60

    console.log(`${minite}: ${second}`)
}, 1000)