// os module 
// operating system module

const os=require('os');

console.log('Platform:',os.platform());
console.log("User:",os.userInfo());


console.log('CPU Architecture:',os.arch());
//get free system memory
console.log('Free Memory:' ,os.freemem(),'bytes');

//get total system memory
console.log('total memory:',os.totalmem(),'bytes');


//get system uptime
console.log('System Uptime :',os.uptime(),'second');

// get home directory

console.log("home Directory:",os.homedir());

//get host name
//
// console.log("host name:", os.hostname());

//get network interface 

//console.log("network interface:",os.networkInterfaces());

//get cpu information
// 
// console.log("CPU Info:",os.cpus());


//get temporary directory

console.log("temporary directory:",os.tmpdir());


//get operating system name

console.log("operating system:",os.type());
