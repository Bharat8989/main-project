const http=require('http');
const server =http.createServer((req,res)=>{
    console.log(req);
    if(req.url ==='/'){
        res.setHeader('Content-Types', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<h2>hello<h/h2>');

    res.write('</html>');
    res.end();
    }
    else if(req.url==='/products'){
        res.setHeader('Content-Types', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<h2>Products<h/h2>');

    res.write('</html>');
    res.end();
    }
    //  res.setHeader('Content-Types', 'text/html');
    // res.write('<html>');
    // res.write('<head><title>Complete Coding</title></head>');
    // res.write('<h2>default<h/h2>');

    // res.write('</html>');
    // res.end();
});
const PORT=3000;
server.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})