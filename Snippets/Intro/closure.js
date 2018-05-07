//Example 1
// adder hold reference to the add function
function adder(x){
    // x is like the 'static' variable 
    return function add(y){
        return x+y;
    }
};

var AdderOne = adder(1);
var result = AdderOne(4);
console.log(result);

var AdderTwo = adder(2);
var result2= AdderTwo(4);
console.log(result2);

//Example 2
// add holds reference to the function
var add =(function(){
    // counter is like a 'static' variable
    var counter = 0;
    // all nested functions have access to scope above them
    return function(){
        return counter++;
    }
})();

console.log(add());
console.log(add());
console.log(add());