// 1 import
const httpModule = require("http")


// 2create server
// 3 ceate server responce ma server aape tene store karvanu
// function requestListener(req,res){
// }
// httpModule.createServer(requestListener)
// or
const myServer = httpModule.createServer((req, res) => {
    // 6 write ,end method
    res.write("<h1>hello i m request<h1/>")
    res.end()

})

// 4 server e run karvau
// parameter ma (port,method)
myServer.listen(9000, (err) => {
    if (err) {
        console.log("this is error of  " + err)
        return
    }
    console.log("server  start")
})

//5 google ma localhost:9000 tya circle farsejema haju koi requst apse nakhi nathi
// socreateServer ma te request aapvani


