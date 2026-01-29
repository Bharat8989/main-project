const http=require('http');

const serve=http.createServer((req,res)=>{
    
console.log(req.url);
if(req.url==="/about"){
    res.end("about the page from app.js")
}
if(req.url==="/contact"){
    res.end("contact us page from app.js");

}
else{
    res.statusCode=404;
}
    res.end("hello world main page from app.js");
})


serve.listen(3000);
console.log("server is listening on port 3000");