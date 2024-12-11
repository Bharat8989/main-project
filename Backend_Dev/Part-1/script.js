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

var ans=arr.filter(function(val){
    if(val>=3 ){
        return true;

    }
    else return false;
})
console.log(ans);