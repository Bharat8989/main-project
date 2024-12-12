/* 
fundamentals of JavaScript:
arrays and objects 
functions return 
async js coding
*/
// foreach map filter find indexOf

var arr=[1,2,3,4];
// 

// arr.forEach(function(val){
//     console.log(val + " hello");
// })

// map filter 

//  var newarr=arr.map(function(val){
//     return val*3;
//  })
//  console.log(newarr);

// var ans=arr.filter(function(val){
//     if(val>=3 ){
//         return true;

//     }
//     else return false;
// })
// console.log(ans);

let fruits=['apple', 'banana', 'mango'];
console.log(fruits[2]);
console.log(fruits[1]);

let person={
    name:'bharat',
    age:20,
    greet:function(){
        return `hello my name is ${this.name}`;
    },

};
console.log(person.name)
console.log(person.greet());


// functions and return values 

function add(a,b){
    return a+b;
}
let sum =add(2,4);
console.log(sum);

// default parameters

function greet1(name="suraj"){
    return `hello ,${name}`;
}
console.log(greet1());

async function fetchData() {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
  