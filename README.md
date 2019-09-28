-------------------------------------------------------------------------------------------------------------- Local setup -----------------------------------

Browser doesnt support es6 feature fully. So we need 3 things

1) Package or tool which compiles es6 code to es5 --- so we need compiler (babel)

2) Module loader - we need javascript code that should be run dynamically (webpack)

3) Server (light weight server may be) - node server

we can go to the link -- https://github.com/topheman/vanilla-es6-jspm -- to see for es6 set up


npm init
npm i --save-dev babel-loader @babel/core  @babel/preset-env    -- this for babel compiler


now create a file called ".babelrc"  - it will hold the babel configuration

inside this file u ll have

{
	"preset":["@babel/preset-env"]
}


........Now we need module loader and bundler (we need functionality like import and export)

so we will use webpack for that


npm i --save-dev webpack webpack-cli

once it gets installed

add new file for webpack configuration

"webpack.config.js"

add this basic config

const path = require('path');
module.exports = {
	entry: './js/index.js',
	output:{
		path: path.resolve(__dirname,'dist'),
		filename:'main.bundle.js'
	}
};



Now go to package.json  inside script

"scripts":{
	"start": "webpack --watch",
	"build": "webpack"
}

Now create index.js in js folder 
create index.html outside

in index.html add
<script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="dist/main.bundle.js"></script>

now create a student.js in js folder and export it to index.js

class Student{
	constructor(name,cls){
		this.name = name;
		this.cls = cls;
	}
}

export default Student;

in index.js

import Student from './student';


$(document).ready(() =>{
	const student = new Student("Rohit", 12);
	let des = `ES6 setup is done by ${ student1.name }`;
	$("h1").text(des);
});

in command prompt  type npm run start



thats all













============Compatibility chart================================

we can see compatibility chart to know which supports which browser version

-- refer : https://kangax.github.io/compat-table/es6/


======== Syntax changes and extensions=========================

*****let , const ****

const ===>  always define const in caps for identification

const A = 27; /// now this value we cant change

cont myArra = [12,13]         

// But we can push new element in the array, since the myArray is actually poiting to the array in memomry. So we basically adding new value to the memory while pointer still point same memory address



******Hoisting with let and const******

 hoisting doesnt work with let and const -- we have to declare let and const first before using

******** Fat arrow function*********

function fn(){}

can be changed to 

var fn = () =>{}


now if we have one parameter

var fn = (a) =>{
	return a+ 5;       
}

this can be written as

var fn = a => a+5;   // This will simply return (no parenthesis when atleast one parameter is ther and no return keyword is needed if the only statement inside a function)



Main difference between a normal function and arrow function is keyword "this" gets treated differently

example :: suppose there is button present in our html

var btn = document.querySelector('button');

function fn(){
	console.log(this);
}

var fn2() = () => console.log(this);

btn.addEventListner('click',fn)  ....  this will print button object (it basically lose the window context)

but ...  btn.addEventListner('click',fn).... this will print a window object 


So an arrow function keep the context in this arrow function is defined

************Default parameter*******	


function fn (number = 10,compare = 2){
	return number == compare;
}

fn() will return false (10==2)

fn(5) will return false(5==2)

fn(5,5) will return true (5==5)

so this way we can define default value


******** Rest operator****************

...  (this is rest parameter)

function sum (...values){
	let result=0;
	for(var i=0;i<values.length;i++){
		result+=values[i]
	}
	return result;
}

sum([1,2,3,4]) === 10

sum(1,2,3) ======== 6

so even if u r any number of arguments it gets converted to an array by rest parameter




***************Spread operator **********

so spread operator is just opposite to rest operator here


suppose I have an array I want to calculate sum by max method


let numbers = [1,4,5,6,3];

console.log(Math.max(numbers))  ===> it will result NAN since max method need number of arument instead of array

by using spread operator we can achieve that

console.log(Math.max(...numbers))  ===> 19  it works







************************* for-of loop************************


its like foreach loop


for(let i in numbers){
	console.log(i)  // it will print each i's
}


************************Template literals*********************

`` - this notation for multi line
${value}-- for dynamice value

let value ="Rohit";
let desc = ` Hello I'm ${value}`;
console.log(desc)  // Hello I'm Rohit;



**************Destructuring array*****************************

let numbers =[1,2,3];
let [a, b] = numbers;  // so a=1 and b=2 


let [a,...b] = numbers // a =1 and b = [2,3]   so we use rest operator

swapping is very easy by using destructuring array


let a =5;
let b = 10;

[b, a] = [a, b];

// a =10 and b = 5




to deconstruct an object we need same propert wt is being used inside object


like this

let obj = {
	"name":"XYZ",
	"age":12
}


let {name,age} = obj; // name = "XYZ"  age = 12

let {name1,age} = obj  // name1 is undefined

if u want to use this way u have to define the alias by ":"

let {name:name1,age} = obj // this will work

