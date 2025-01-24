const http=require('http')
const server=http.createServer(function(req,res){
    if( req.url === '/'){
        res.setHeader('Content-Type','text/html')
    res.write('<h1>welcome to the home page <h1>')
    res.end()
    }

    if( req.url === '/about'){
        res.write('welcome to the about page')
        res.end()
        }

});

const PORT=3000;
server.listen(PORT);
console.log("server run on localhost:3000")