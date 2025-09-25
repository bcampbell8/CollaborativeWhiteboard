


class Point {
	x = 0;
	y = 0;
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}


let a = new Point(0, 0);
let b = { x: 1, y: 1 };


console.log("a:"); // returns class name with data attached
console.log(a); // output: `Point { x: 0, y: 0 }`

console.log("b:"); // returns anonymous object with only data
console.log(b); // output: `{ x: 1, y: 1 }`


