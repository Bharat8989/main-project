console.log("Hello via Bun!");

// console.log("hello world");

const square={
    area: (a) =>(a*a),
    perimeter:(a)=> (4*a)
}
const calsquare=(a)=>{
    console.log(`the value of a is ${a} and the area is `+square.area(a));
    console.log(`the value of a is ${a} and the area is `+square.perimeter(a));
    
}
calsquare(5); 