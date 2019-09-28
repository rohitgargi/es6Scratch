import Student from './student';


$(document).ready(() => {
	const student1 = new Student("Rohit", 12);
	let des = `ES6 setup is done by ${ student1.name }`;
	$("h1").text(des);
});
