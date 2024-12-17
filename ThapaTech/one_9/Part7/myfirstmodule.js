
function myDateTime() {
    return new Date().toLocaleString(); 
}


function getGreeting(name) {
    return `Hello, ${name}! Welcome to Node.js`;
}


module.exports = {
    myDateTime,
    getGreeting
};
