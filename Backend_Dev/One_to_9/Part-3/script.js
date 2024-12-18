/**  npm understanding 
 * installing and uninstalling anything basics and advanced 
 * understanding node modules 
 * dependencies
 * devdependencies
 * scripts understanding default scripts Path and custom scripts
 * yh
 */

const http=require('http');
const server=http.createServer(function(req,res){
    res.end("hello pavan!");
})
server.listen(3000);

console.log("hello world");