const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {

    const msg = `NEW USER = ${new Date()} | IP ADDRESS: ${req.socket.remoteAddress}\n`;
    console.log(req.url)

    fs.appendFile("./date.txt", msg, (err) => {
        if (err) console.log("Error while writing file");
    });
    // console.log(req.url)

    let filename = ""
    switch (req.url) {
        case '/':
            filename = "home.html"
            break;

        case '/about':
            filename = "about.html"
            break;

        case '/contact':
            filename = "contact.html"
            break;
            default:
                            filename = "notFound.html"

    }

    fs.readFile(filename, (err, result) => {
       
        res.end(result)
    })
});

myServer.listen(8080, (err) => {
    if (err) {
        console.log("Server is not started");
        return;
    }
    console.log("Started on port 8080");
});
